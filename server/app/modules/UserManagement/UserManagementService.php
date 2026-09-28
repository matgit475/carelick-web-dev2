<?php
    namespace App\Modules\UserManagement;

    use App\Shared\Exception\ForbiddenException;
    use App\Modules\UserManagement\UserManagementRepository;
    use App\Modules\Auth\AuthRepository;

    class UserManagementService {
        private $userRepository;
        private $authRepository;
        
        public function __construct(UserManagementRepository $userRepository, AuthRepository $authRepository) {
            $this->userRepository = $userRepository;
            $this->authRepository = $authRepository;
        }

        public function getSettings($user_id) {
            $user = $this->userRepository->getUserSettings($user_id);
            return $user;
        }

        public function updateSettings($user_id, $dto){
           
            if ($dto->isPasswordSet()){
                $hashedPassword = password_hash($dto->newPassword, PASSWORD_DEFAULT);
                $this->authRepository->update("users", "id", $user_id, ["password" => $hashedPassword]);
            }

            $this->userRepository->update("users", "id", $user_id, $dto->toPersonalDetailsArray());
            $group_id = $this->userRepository->getGroupIdByName($dto->groupName)["id"];
            $this->userRepository->update("users_groups", "user_id", $user_id, ["group_id" => $group_id]);
            return [
                "message" => "The user's settings have been successfully updated!",
                "user" => $this->userRepository->getUserById($user_id)
            ];
        }


        public function getUsers() {
            return $this->userRepository->getAll();
        }

        public function deleteUser($id, $current_user_id) {
            if ($id == $current_user_id) {
                throw new ForbiddenException("You cannot delete your own account.");
            }
            $this->userRepository->delete("users", "id", $id);
            return [
                "message" => "User has been successfully deleted!"
            ];
        }

        public function getUnverifiedUsers() {
            return $this->userRepository->getUnverifiedUsers();
        }
    }
?>