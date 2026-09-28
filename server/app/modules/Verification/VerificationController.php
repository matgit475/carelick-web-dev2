<?php
    namespace App\Modules\Verification;

    use Psr\Http\Message\ServerRequestInterface as Request;
    use Psr\Http\Message\ResponseInterface as Response;
    use App\Shared\Controllers\BaseController;
    use App\Modules\Verification\VerificationService;
    
    class VerificationController extends BaseController{
        private $verificationService;

        public function __construct(VerificationService $verificationService) {
            $this->verificationService = $verificationService;
        }

       public function getRequests(Request $request, Response $response, array $args = []){
            $result = $this->verificationService->getRequests();
            return $this->jsonResponse($response, $result);
       }

       public function acceptRequest(Request $request, Response $response, array $args = []){
           $id = $args['id'];
            $this->verificationService->acceptRequest($id);
            return $this->jsonResponse($response, ['message' => 'Request accepted Successfully!']);
       }

       public function declineRequest(Request $request, Response $response, array $args = []){
           $id = $args['id'];
            $this->verificationService->declineRequest($id);
            return $this->jsonResponse($response, ['message' => 'Request declined Successfully!']);
       }
    }
?>
