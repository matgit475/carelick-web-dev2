<?php
    namespace App\Modules\Image;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;

    class ImageController extends BaseController{
        private $imageService;

        public function __construct(ImageService $imageService) {
            $this->imageService = $imageService;
        }

        public function getImage(Request $request, Response $response, array $args = []){
            $fileName = $args['file_name'];
            $result = $this->imageService->getImageByFileName($fileName);
            return $this->imageResponse($response, $result);
        }
    }
?>
