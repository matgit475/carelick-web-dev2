<?php
namespace App\Modules\Auth;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class AuthRepository extends BaseRepository {
    public function findByEmail($email){
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $result =  $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getRoleByUserId(int $userId){
        $sql = "
            SELECT g.name AS name
            FROM `groups` g
            JOIN users_groups ug ON g.id = ug.group_id
            WHERE ug.user_id = :user_id
            LIMIT 1
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['name'] ?? null;
    }

    public function saveOtpForUser($userId, $otp) {
        $sql = "UPDATE users SET activation_code = :otp WHERE id = :userId";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':otp' => $otp,
            ':userId' => $userId
        ]);
    }
    
    public function createNewUser($firstName, $lastName, $email, $hashedPassword){
        try{    
            $this->db->beginTransaction();
            $data = [
                "email"=>$email,
                "ip_address"=>$_SERVER['REMOTE_ADDR'],
                "username"=>$email,
                "password"=>$hashedPassword,
                "salt"=>"",
                "first_name"=>$firstName,
                "last_name"=>$lastName,
                "auth_token"=>"",
                "created_on"=>time()
            ];
            $userId= $this->create('users', $data);
            $data = [
                "user_id"=> $userId,
                "group_id"=> 2  /* name = members */
            ];
            $this->create('users_groups',$data);
            $data = ["user_id"=> $userId];
            $this->create('members',$data);
            $this->db->commit();
        }
        catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function markEmailVerified($userId) {
        $sql = "UPDATE users SET is_email_verified = 1 WHERE id = :userId";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([':userId' => $userId]);
    }

    public function findByResetToken($token){
        $stmt = $this->db->prepare("SELECT * FROM users WHERE forgotten_password_code = ?");
        $stmt->execute([$token]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updatePassword($userId, $newPasswordHash) {
        try {
            $this->db->beginTransaction();
            $this->update("users", "id", $userId, ["password" => $newPasswordHash]);
            $this->update("users", "id", $userId, ["forgotten_password_code" => ""]);
            $this->db->commit();
        } catch (Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}
?>