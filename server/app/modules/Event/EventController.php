<?php
    namespace App\Modules\Event;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;

    class EventController extends BaseController{
        private $eventService;

        public function __construct(EventService $eventService) {
            $this->eventService = $eventService;
        }

        public function getPublicEvents(Request $request, Response $response, array $args = []){
            $params = $request->getQueryParams();
            $filter = $params['filter'] ?? "all";
            $limit = $params['limit'] ?? null;
            $result = $this->eventService->getPublicEvents($filter, $limit);
            return $this->jsonResponse($response, $result); 
        }
        public function getEventById(Request $request, Response $response, array $args = []){
            $id = $args['id'];
            $result = $this->eventService->getEventById($id);
            return $this->jsonResponse($response, $result);
        } 
    }
?>
