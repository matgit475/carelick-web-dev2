<?php
namespace App\Modules\Verification;
use Slim\App;
use App\Modules\Verification\VerificationController;
use App\Shared\Middleware\JwtMiddleware;
use App\Shared\Middleware\AdminMiddleware;

class VerificationRoutes
{
    public static function map(App $app){
        $app->group('/verification', function ($group) {
            $group->post('/decline/{id}', [ VerificationController::class, 'declineRequest']);
            $group->post('/accept/{id}', [VerificationController::class, 'acceptRequest']);
            $group->get('/requests', [VerificationController::class, 'getRequests']);
        })
        ->add(AdminMiddleware::class)
        ->add(JwtMiddleware::class);
    }
}
