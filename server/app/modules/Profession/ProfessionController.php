<?php
    namespace App\Modules\Profession;

    use App\Shared\Controllers\BaseController;
    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;

    class ProfessionController extends BaseController{
        private $professionService;

        public function __construct(ProfessionService $professionService) {
            $this->professionService = $professionService;
        }

        public function getAllProfessions(Request $request, Response $response, array $args = []){
            $result = $this->professionService->getProfessions();
            return $this->jsonResponse($response, $result);
        }
    }
?>
