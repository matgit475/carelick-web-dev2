<?php
namespace App\Modules\Verification;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class VerificationRepository extends BaseRepository {

    public function getRequests() {
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

    public function acceptRequest($id) {
        $stmt = $this->db->prepare("UPDATE users SET account_verified = 1 WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function declineRequest($id) {
        $stmt = $this->db->prepare("DELETE FROM users WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>