<?php
namespace App\Modules\Auth;
use Slim\App;
use App\Modules\Auth\AuthController;
use App\Shared\Middleware\JwtMiddleware;

class AuthRoutes
{
    public static function map(App $app){
        $app->group('/auth', function ($group) {
            $group->post('/register', [AuthController::class, 'register']);
            $group->post('/login-with-otp', [AuthController::class, 'loginWithOtp']);
            $group->post('/login', [AuthController::class, 'login']);
            $group->post('/refresh', [AuthController::class, 'refreshToken']);
            $group->post('/forgot-password', [AuthController::class, 'forgotPassword']);
            $group->post('/reset-password', [AuthController::class, 'resetPassword']);
        });
        $app->group('/auth', function ($group) {
            $group->post('/change-password', [AuthController::class, 'changePassword']);
            $group->post('/logout', [AuthController::class, 'logout']);
        })->add(JwtMiddleware::class);
    }
}
