<?php
namespace App\Modules\UserManagement;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class UserManagementRepository extends BaseRepository {
	public function getAll($table = "users") {
        $stmt = $this->db->query("SELECT 
            u.*,
            g.name AS role,
            p.profession_name AS profession_name
            FROM users u
            JOIN users_groups ug ON u.id = ug.user_id
            JOIN `groups` g ON ug.group_id = g.id
            JOIN members m ON u.id = m.user_id
            LEFT JOIN profession p ON m.profession_id = p.profession_id;");

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserById($user_id) {
        $stmt = $this->db->prepare("SELECT 
            u.*,
            g.name AS role,
            p.profession_name AS profession_name
            FROM users u
            JOIN users_groups ug ON u.id = ug.user_id
            JOIN `groups` g ON ug.group_id = g.id
            JOIN members m ON u.id = m.user_id
            LEFT JOIN profession p ON m.profession_id = p.profession_id
            WHERE u.id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findProfile($user_id) {
        $stmt = $this->db->prepare("SELECT 
        u.*,
        g.id AS group_id,
        m.*
        FROM users u
        JOIN users_groups ug ON u.id = ug.user_id
        JOIN `groups` g ON ug.group_id = g.id
        JOIN members m ON u.id = m.user_id
        WHERE u.id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>