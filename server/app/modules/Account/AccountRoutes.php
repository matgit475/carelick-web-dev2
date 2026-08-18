<?php
namespace App\Modules\Account;
use Slim\App;
use App\Modules\Account\AccountController;
use App\Shared\Middleware\JwtMiddleware;
use App\Shared\Middleware\AdminMiddleware;

class AccountRoutes
{
    public static function map(App $app){
        $app->group('/account', function ($group) {
            $group->get('/', [AccountController::class, 'getMyAccount']);
            $group->get('/settings', [AccountController::class, 'getMySettings']);
            $group->post('/settings', [AccountController::class, 'updateMySettings']);
            $group->post('/update_password', [AccountController::class, 'updateMyPassword']);
            $group->get('/profile', [AccountController::class, 'getMyProfile']);
            $group->post('/profile', [AccountController::class, 'updateMyProfile']);
        })->add(JwtMiddleware::class);
    }
}
