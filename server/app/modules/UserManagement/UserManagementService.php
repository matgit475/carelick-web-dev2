<?php
    namespace App\Modules\UserManagement;

    use App\Shared\Exception\ForbiddenException;
    use App\Modules\UserManagement\UserManagementRepository;

    class UserManagementService {
        private $userRepository;

        public function __construct(UserManagementRepository $userRepository) {
            $this->userRepository = $userRepository;
        }

        public function getSettings($user_id) {
            $user = $this->userRepository->find("users", "id", $user_id);
            return $user;
        }

        public function updateSettings($user_id, $dto){
            $this->userRepository->update("users", "id", $user_id, $dto->toArray());

            return [
                "message" => "The user's settings have been successfully updated!",
                "user" => $this->userRepository->getUserById($user_id)
            ];
        }

        public function updatePassword($user_id, $dto){
            if ($dto->newPassword !== $dto->retypePassword) {
                throw new ForbiddenException("Passwords do not match.");
            }
            $hashedPassword = password_hash($dto->newPassword, PASSWORD_DEFAULT);
            $this->userRepository->update("users", "id", $user_id, ["password" => $hashedPassword]);
            return [
                "message" => "The user's password has been successfully updated."
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

        public function getProfile($user_id) {
            $user = $this->userRepository->findProfile($user_id);
            return $user;
        }

        public function updateProfile($user_id, $dto) {
            $this->userRepository->update("members", "user_id", $user_id, [
                "surname" => $dto->surname, 
                "father_name" => $dto->fatherName,
            ]);
            return [
                "message" => "Your profile has been successfully updated!"
            ];
        }

    }
?>