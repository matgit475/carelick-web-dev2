<?php
    namespace App\Modules\Account;

    use App\Shared\Exception\ForbiddenException;
    use App\Modules\Account\AccountRepository;
    use App\Modules\Auth\AuthRepository;
    use App\Shared\Security\JwtService;

    class AccountService {
        private $accountRepository;
        private $authRepository;
        private $jwtService;

        public function __construct(AccountRepository $accountRepository, AuthRepository $authRepository, JwtService $jwtService) {
            $this->accountRepository = $accountRepository;
            $this->authRepository = $authRepository;
            $this->jwtService = $jwtService;
        }

        public function getSettings($user_id) {
            $user = $this->authRepository->find("users", "id", $user_id);
            return $user;
        }

        public function updateSettings($user_id, $dto){
            $this->authRepository->update("users", "id", $user_id, $dto->toArray());
            $role = $this->authRepository->getRoleByUserId($user_id);
            $user = $this->authRepository->find("users", "id", $user_id);
            $email = $user["email"];
            $first_name = $user["first_name"];
            $account_verified = $user["account_verified"];
            $token = $this->jwtService->encode($user_id, $role, $email, $first_name, $account_verified);
            setcookie('token', $token, [
                'httpOnly' => true,
                'secure' => false,
                'sameSite' => 'Lax',
                'path' => '/',
                'expires' => time() + 3600,
            ]);
                  
            return [
                "message" => "Your account settings have been successfully updated!",
                "user" => ["id"=>$user_id, "role"=>$role, "email"=>$email, "first_name"=>$first_name]
            ];
        }

        public function updateMyPassword($user_id, $dto){
            if ($dto->newPassword !== $dto->retypePassword) {
                throw new ForbiddenException("Passwords do not match.");
            }
            $hashedPassword = password_hash($dto->newPassword, PASSWORD_DEFAULT);
            $this->authRepository->update("users", "id", $user_id, ["password" => $hashedPassword]);
            return [
                "message" => "Your account password has been successfully updated."
            ];
        }

        public function getProfile($user_id) {
            $user = $this->accountRepository->findProfile($user_id);
            return $user;
        }

        public function updateProfile($user_id, $dto) {
            $this->authRepository->update("members", "user_id", $user_id, [
                "surname" => $dto->surname, 
                "father_name" => $dto->fatherName,
            ]);
            return [
                "message" => "Your profile has been successfully updated!"
            ];
        }

    }
?>