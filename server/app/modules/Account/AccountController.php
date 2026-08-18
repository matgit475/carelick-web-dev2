<?php
    namespace App\Modules\Account;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;
    use App\Shared\Dto\UpdateSettingsDto;
    use App\Shared\Dto\UpdateProfileDto;
   use App\Shared\Dto\UpdatePasswordDto;
    use App\Modules\Account\AccountService;

    class AccountController extends BaseController{
        private $accountService;
        private $updateSettingsDto;
        private $updateProfileDto;
        private $updatePasswordDto;

        public function __construct(AccountService $accountService, UpdateSettingsDto $updateSettingsDto, UpdateProfileDto $updateProfileDto,UpdatePasswordDto $updatePasswordDto) {
            $this->accountService = $accountService;
            $this->updateSettingsDto = $updateSettingsDto;
            $this->updateProfileDto = $updateProfileDto;
            $this->updatePasswordDto = $updatePasswordDto;
        }

        public function getMyAccount(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            return $this->jsonResponse($response, $user);
        }

        public function getMySettings(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            $result = $this->accountService->getSettings($user['id']);
            return $this->jsonResponse($response, $result);
        }

        public function updateMySettings(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            $data = $request->getParsedBody();
            $dto = $this->updateSettingsDto->fromArray($data);
            $result = $this->accountService->updateSettings($user['id'], $dto);
            return $this->jsonResponse($response, $result);
        }

        public function updateMyPassword(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            $data = $request->getParsedBody();
            $dto = $this->updatePasswordDto->fromArray($data);
            $result = $this->accountService->updateMyPassword($user["id"], $dto);
            return $this->jsonResponse($response, $result);
        }

        public function getMyProfile(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            $result = $this->accountService->getProfile($user['id']);
            return $this->jsonResponse($response, $result);
        }

        public function updateMyProfile(Request $request, Response $response, array $args = []){
            $user = $request->getAttribute('user');
            $data = $request->getParsedBody();
            $dto = $this->updateProfileDto->fromArray($data);
            $result = $this->accountService->updateProfile($user['id'], $dto);
            return $this->jsonResponse($response, $result); 
        }
    }
?>
