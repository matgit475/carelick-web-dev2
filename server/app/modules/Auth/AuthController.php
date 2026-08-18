<?php
    namespace App\Modules\Auth;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;
    use App\Modules\Auth\AuthService;
    use App\Modules\Auth\AuthValidator;
    use App\Modules\Auth\AuthDto\RegisterDto;
    use App\Modules\Auth\AuthDto\LoginDto;

    class AuthController extends BaseController{
        private $authService;
        private $authValidator;
        private $registerDto;
        private $loginDto;

        public function __construct(AuthService $authService, AuthValidator $authValidator, LoginDto $loginDto, RegisterDto $registerDto) {
            $this->authService = $authService;
            $this->authValidator = $authValidator;
            $this->registerDto = $registerDto;
            $this->loginDto = $loginDto;
        }

        public function register(Request $request, Response $response, array $args = []){
            $data = $request->getParsedBody();
            $dto = $this->registerDto->fromArray($data);
            $this->authValidator->validateRegister($dto);
            $result = $this->authService->register($dto);
            return $this->jsonResponse($response, $result);
        }

        public function loginWithOtp(Request $request, Response $response, array $args = []) {
            $data = $request->getParsedBody();    
            $email = trim($data['email']);
            $otp = trim($data['otp']);
            $result = $this->authService->loginWithOpt($email, $otp);
            return $this->jsonResponse($response, $result);
        }

        public function login(Request $request, Response $response, array $args = []) {
            $data = $request->getParsedBody(); 
            $dto = $this->loginDto->fromArray($data);
            $result = $this->authService->login($dto);
            return $this->jsonResponse($response, $result);
        }

        public function forgotPassword(Request $request, Response $response, array $args = []){  
            $data = $request->getParsedBody(); 
            $email = trim($data['email']);
            $result = $this->authService->forgotPassword($email);
            return $this->jsonResponse($response, $result); 
        }

        public function logout(Request $request, Response $response, array $args = []){
            $result = $this->authService->logout();
            return $this->jsonResponse($response, $result);
        }

        public function resetPassword(Request $request, Response $response, array $args = []){  
            $data = $request->getParsedBody(); 
            $newPassword = trim($data['newPassword']);
            $retypePassword = trim($data["retypePassword"]);
            $token = trim($data['token']);
            $result = $this->authService->resetPassword($newPassword, $retypePassword, $token);
            return $this->jsonResponse($response, $result); 
        }

        public function changePassword(){
        }

    }
?>
