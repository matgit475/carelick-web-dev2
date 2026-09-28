<?php

    namespace App\Modules\Auth;

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    use App\Modules\Auth\AuthRepository;
    use App\Shared\Exception\BadRequestException;
    use App\Shared\Exception\NotFoundException;
    use App\Shared\Exception\ConflictException;
    use App\Shared\Exception\UnauthorizedException;
    use App\Shared\Mail\EmailManager;
    use App\Shared\Security\JwtService;

    class AuthService {
        private $authRepository;
        private $emailManager;
        private $jwtService;
        public function __construct(AuthRepository $authRepository, EmailManager $emailManager, JwtService $jwtService) {
            $this->authRepository = $authRepository;
            $this->emailManager = $emailManager;
            $this->jwtService = $jwtService;
        }

        private function generateOtp() {
            return random_int(100000, 999999); // securely generate 6-digit OTP
        }

        public function register($dto){
            // Step 1: Check if passwords are same
            if ($dto->password !== $dto->confirmPassword){
                throw new BadRequestException("Passwords don't match!");
            }

            // Step 2: Check if the email already exists in the database
            $existingUser = $this->authRepository->findByEmail($dto->email);
            if ($existingUser) {
                throw new BadRequestException("Email is already taken!");
            }

            // Step 3: Hash the password
            $hashedPassword = password_hash($dto->password, PASSWORD_DEFAULT);

            // Step 4: Create the new user in the database
            $this->authRepository->createNewUser($dto->firstName, $dto->lastName, $dto->email, $hashedPassword);
             
            // Step 5: Generate JWT token
            $user = $this->authRepository->findByEmail($dto->email);
            $userId =$user["id"];
            $role = $this->authRepository->getRoleByUserId($userId);
            $user = $this->authRepository->find("users", "id", $userId);
            $email = $user["email"];
            $first_name = $user["first_name"];
            $account_verified = $user["account_verified"];
            $token = $this->jwtService->encode($userId, $role, $email, $first_name, $account_verified);

            setcookie('token', $token, [
                'httpOnly' => true,
                'secure' => false,
                'sameSite' => 'Lax',
                'path' => '/',
                //'expires' => time() + 3600,
            ]);

            // Step 6: Ideally, generate and store real OTP here
            $otp = $this->generateOtp();
            $this->authRepository->saveOtpForUser($userId, $otp);

            // Step 7: Send email
            if ($this->emailManager->sendOtpEmail($email,$otp)){
                return  ["message" => "Account created successfully! Please check your email to signin with OTP."];            
            }
        }

        public function loginWithOpt($email, $otp){
            // Query user from database
            $user = $this->authRepository->findByEmail($email);
            if (!$user) throw new NotFoundException("Your email was incorrect. Please try again.");
            if ($user["is_email_verified"]) throw new ConflictException("Email is already verified.");
                
            // Verify user  with email
            if ($user && 
               ($otp == $user['activation_code']) &&
               (time() - $user['last_otp']) <= 86400 ) {
                $userId = $user['id'];
                $role = $this->authRepository->getRoleByUserId($userId);
                $user = $this->authRepository->find("users", "id", $userId);
                $email = $user["email"];
                $first_name = $user["first_name"];
                $account_verified = $user["account_verified"];

                $this->authRepository->markEmailVerified($userId);
                $token = $this->jwtService->encode($userId, $role, $email, $first_name, $account_verified);
                
                setcookie('token', $token, [
                    'httpOnly' => true,
                    'secure' => false,
                    'sameSite' => 'Lax',
                    'path' => '/',
                    //'expires' => time() + 3600,
                ]);

                return ["id"=>$userId, "role"=>$role, "email"=>$email, "first_name"=>$first_name, "account_verified"=>$account_verified];
            } else {
                throw new UnauthorizedException("Your OTP was incorrect or expired. Please try again.");
            }
        }

        public function login($dto){
            
            // Query user from database
            $user = $this->authRepository->findByEmail($dto->email);

            // Verify password
            if ($user && password_verify($dto->password, $user['password'])) {
                $userId = $user['id'];
                if ($user['is_email_verified'] == 1){
                    $role = $this->authRepository->getRoleByUserId($userId);
                    $user = $this->authRepository->find("users", "id", $userId);
                    $email = $user["email"];
                    $first_name = $user["first_name"];
                    $account_verified = $user["account_verified"];
                    $token = $this->jwtService->encode($userId, $role, $email, $first_name, $account_verified);

                    setcookie('token', $token, [
                        'httpOnly' => true,
                        'secure' => false,
                        'sameSite' => 'Lax',
                        'path' => '/',
                        //'expires' => time() + 3600,
                    ]);
                    return ["id"=>$userId, "role"=>$role, "email"=>$email, "first_name"=>$first_name, "account_verified"=>$account_verified];
                }
                else{
                    // Ideally, generate and store real OTP here
                    $otp = $this->generateOtp();
                    $this->authRepository->saveOtpForUser($userId, $otp);
                    
                    // Send email
                    if ($this->emailManager->sendOtpEmail($dto->email,$otp)){
                        throw new UnauthorizedException("Your email address is not verified. Please check your inbox to login with OTP.");
                    }
                }
            } else {
                throw new UnauthorizedException("Your email or password was incorrect. Please try again.");
            }
        }

        function forgotPassword($email){
            $user = $this->authRepository->findByEmail($email);
            if (!$user) {
                throw new NotFoundException("Your email was incorrect. Please try again.");
            }
            // Generate a new token 
            $token = bin2hex(random_bytes(4)); // 8-character random token
            if ($this->authRepository->update("users", "id", $user["id"],["forgotten_password_code"=>$token, "forgotten_password_time"=> time()])){
                if ($this->emailManager->sendPasswordResetEmail($email,$token)){
                    return ["message" => "Check your email to reset your password!"];
                }
            };
        }

        public function logout()
        {
            setcookie('token', '', [
                'path' => '/',
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Lax',
                'expires' => time() - 3600,
            ]);
            return ['message' => 'Logged out successfully'];
        }

         public function resetPassword($newPassword, $retypePassword, $token){

            $user = $this->authRepository->findByResetToken($token);
            if (!$user) {
                throw new BadRequestException("Invalid token.");
            }

            if ($newPassword !== $retypePassword){
                throw new BadRequestException("Passwords don't match!");
            }
        
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $this->authRepository->updatePassword($user["id"], $hashedPassword);
            $role = $this->authRepository->getRoleByUserId($user["id"]);
            $email = $user["email"];
            $first_name = $user["first_name"];
            $account_verified = $user["account_verified"];
            $token = $this->jwtService->encode($user["id"], $role, $email, $first_name, $account_verified);

            setcookie('token', $token, [
                'httpOnly' => true,
                'secure' => false,
                'sameSite' => 'Lax',
                'path' => '/',
                //'expires' => time() + 3600,
            ]);
            return ["id"=>$user["id"], "role"=>$role, "email"=>$email, "first_name"=>$first_name, "account_verified"=>$account_verified];
        }
    }
?>