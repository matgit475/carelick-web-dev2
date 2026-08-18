<?php

    namespace App\Modules\Event;

    use App\Modules\Event\EventRepository;
    use App\Modules\Event\EventGalleryRepository;

    class EventService {
        private $eventRepository;
        private $defaultImage = '555555.png';

        public function __construct(EventRepository $eventRepository) {
            $this->eventRepository = $eventRepository;
        }
        
        private function normalizeEventImage($event) {
            if ($event['event_image'] === "NA") {
                $event['event_image'] = $this->defaultImage;
            } 
            return $event;
        }

        public function getPublicEvents($filter, $limit) {
            switch($limit) {
                case null:
                    switch ($filter) {
                        case 'past': return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getAllPastEvents());
                        case 'upcomming': return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getAllUpcomingEvents());
                        case 'all' : return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getAllEvents());
                        default: return null;
                    }
                default:
                    switch ($filter) {
                        case 'past': return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getPastEvents($limit));
                        case 'upcomming': return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getUpcomingEvents($limit));
                        case 'all' : return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getEvents($limit));
                        default: return null;
                    }
            }
        }

        public function getEventById($id) {
            return [
                "event" => $this->normalizeEventImage($this->eventRepository->find("events", "event_id", $id)),
                "event_gallery"=> $this->eventRepository->findGalleryByEventId($id)
            ];
        }
    }
?>