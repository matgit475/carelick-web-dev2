<?php
namespace App\Modules\Account;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class AccountRepository extends BaseRepository {
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