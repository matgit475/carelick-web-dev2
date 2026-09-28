<?php
    namespace App\Modules\UserManagement;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;
    use App\Modules\UserManagement\UserManagementService;
    use App\Modules\UserManagement\UserSettingsDto;
    
    class UserManagementController extends BaseController{
        private $userService;
        private $userSettingsDto;

        public function __construct(UserManagementService $userService, UserSettingsDto $userSettingsDto) {
            $this->userService = $userService;
            $this->userSettingsDto = $userSettingsDto;
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
            $dto = $this->userSettingsDto->fromArray($data);
            $result = $this->userService->updateSettings($id, $dto);
            return $this->jsonResponse($response, $result);
        }

       public function getUnverifiedUsers(Request $request, Response $response, array $args = []){
            $result = $this->userService->getUnverifiedUsers();
            return $this->jsonResponse($response, $result);
        }
    }
?>
