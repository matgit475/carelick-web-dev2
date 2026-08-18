<?php
    namespace App\Modules\News;

    use App\Shared\Controllers\BaseController;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    class NewsController extends BaseController{
        private $newsService;

        public function __construct(NewsService $newsService) {
            $this->newsService = $newsService;
        }

        public function getPublicNews(Request $request, Response $response, array $args = []){
            $result = $this->newsService->getPublicNews();
            return $this->jsonResponse($response, $result);
        }
    }
?>
