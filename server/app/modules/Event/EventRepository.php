<?php
namespace App\Modules\Event;

use App\Shared\Repositories\BaseRepository;
use App\Database;
use PDO;

class EventRepository extends BaseRepository {
    public function getPastEvents($limit) {
        $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_from < NOW() ORDER BY event_duration_from DESC LIMIT $limit");
        return $stmt->fetchAll();
    }
        
    public function getUpcomingEvents($limit) {
        $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_to > NOW() ORDER BY event_duration_from DESC LIMIT $limit");
        return $stmt->fetchAll();
    }

    public function getEvents($limit){
        $stmt = $this->db->query("SELECT * FROM events ORDER BY event_duration_from DESC LIMIT $limit");
        return $stmt->fetchAll();
    }

    public function getAllPastEvents() {
        $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_from < NOW() ORDER BY event_duration_from DESC");
        return $stmt->fetchAll();
    }
        
    public function getAllUpcomingEvents() {
        $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_to > NOW() ORDER BY event_duration_from DESC");
        return $stmt->fetchAll();
    }

    public function getAllEvents(){
        $stmt = $this->db->query("SELECT * FROM events ORDER BY event_duration_from DESC");
        return $stmt->fetchAll();
    }

    public function findGalleryByEventId($id) {
        $query = "SELECT * FROM event_gallery WHERE event_id = :event_id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":event_id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC); // Returns an associative array or false if not found
    }
}
?>