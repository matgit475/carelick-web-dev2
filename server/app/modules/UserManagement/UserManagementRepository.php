<?php
namespace App\Modules\UserManagement;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class UserManagementRepository extends BaseRepository {
	public function getAll($table = "users") {
        $stmt = $this->db->query("SELECT  
    u.id,
    u.first_name,
    u.last_name,
    u.phone,
    u.account_verified,
    fr.root_id,
    CASE
        WHEN u.email LIKE '%@carelick.com'
          OR u.email LIKE '%@carelick.org'
          OR u.email LIKE '%---%'
        THEN ''
        ELSE u.email
    END AS email,
    g.name AS role,
    p.profession_name AS profession_name
    FROM users u
    JOIN users_groups ug 
        ON u.id = ug.user_id
    JOIN `groups` g 
        ON ug.group_id = g.id
    JOIN members m 
        ON u.id = m.user_id
    LEFT JOIN profession p 
        ON m.profession_id = p.profession_id
    LEFT JOIN family_relation fr 
        ON u.id = fr.child_id
    ");

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

    public function getUserSettings($user_id){
        $stmt = $this->db->prepare("SELECT 
        u.*,
        g.name As group_name
        FROM users u
        JOIN users_groups ug ON u.id = ug.user_id
        JOIN `groups` g ON ug.group_id = g.id
        WHERE u.id = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getGroupIdByName($group_name){
        $stmt = $this->db->prepare("SELECT id FROM `groups` WHERE name = :group_name");
        $stmt->bindParam(':group_name', $group_name, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUnverifiedUsers() {
        $stmt = $this->db->query("SELECT 
            u.id,            
            u.first_name,
            u.last_name,
            m.title as title,
            u.phone as phone_number,
            g.name AS user_group
            FROM users u
            JOIN users_groups ug ON u.id = ug.user_id
            JOIN `groups` g ON ug.group_id = g.id
            JOIN members m ON u.id = m.user_id
            WHERE u.account_verified = 0");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>