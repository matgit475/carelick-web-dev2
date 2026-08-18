<?php
    namespace App\Modules\UserManagement;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;
    use App\Shared\Dto\UpdateSettingsDto;
    use App\Shared\Dto\UpdatePasswordDto;
    use App\Shared\Dto\UpdateProfileDto;
    use App\Modules\UserManagement\UserManagementService;
    
    class UserManagementController extends BaseController{
        private $userService;
        private $updateSettingsDto;
        private $updateProfileDto;
        private $updatePasswordDto;

        public function __construct(UserManagementService $userService, UpdateSettingsDto $updateSettingsDto, UpdateProfileDto $updateProfileDto, UpdatePasswordDto $updatePasswordDto) {
            $this->userService = $userService;
            $this->updateSettingsDto = $updateSettingsDto;
            $this->updateProfileDto = $updateProfileDto;
            $this->updatePasswordDto = $updatePasswordDto;
        }

        public function getUsers(Request $request, Response $response, array $args = []){
            $result = $this->userService->getUsers();
            return $this->jsonResponse($response, $result); 
        }

        public function deleteUser(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $user = $request->getAttribute('user');
            $result = $this->userService->deleteUser($id,$user['id']);
            return $this->jsonResponse($response, $result);
        }

        public function getUserSettings(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $result = $this->userService->getSettings($id);
            return $this->jsonResponse($response, $result);
        }

        public function updateUserSettings(Request $request, Response $response, array $args = [])
        {
            $id = $args['id'];
            $data = $request->getParsedBody();
            $dto = $this->updateSettingsDto->fromArray($data);
            $result = $this->userService->updateSettings($id, $dto);
            return $this->jsonResponse($response, $result);
        }

        public function updateUserPassword(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $data = $request->getParsedBody();
            $dto = $this->updatePasswordDto->fromArray($data);
            $result = $this->userService->updatePassword($id, $dto);
            return $this->jsonResponse($response, $result);
        }
        /*
        public function getUserProfile(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $result = $this->userService->getProfile($id);
            return $this->jsonResponse($response, $result);
        }

        public function updateUserProfile(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $data = $request->getParsedBody();
            $dto = $this->updateProfileDto->fromArray($data);
            $result = $this->userService->updateProfile($id, $dto);
            return $this->jsonResponse($response, $result); 
        }
        */
    }
?>
