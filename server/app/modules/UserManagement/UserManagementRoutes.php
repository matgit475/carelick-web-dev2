<?php
namespace App\Modules\UserManagement;
use Slim\App;
use App\Modules\UserManagement\UserManagementController;
use App\Shared\Middleware\JwtMiddleware;
use App\Shared\Middleware\AdminMiddleware;

class UserManagementRoutes
{
    public static function map(App $app){
        $app->group('/users', function ($group) {
            $group->get('', [ UserManagementController::class, 'getUsers' ]);
            $group->delete('/{id}', [ UserManagementController::class, 'deleteUser' ]);
            $group->get('/settings/{id}', [ UserManagementController::class, 'getUserSettings' ]);
            $group->post('/settings/{id}', [ UserManagementController::class, 'updateUserSettings']);
            $group->post('/update_password/{id}', [UserManagementController::class, 'updateUserPassword']);
            $group->get('/profile/{id}', [UserManagementController::class, 'getUserProfile']);
            $group->post('/profile/{id}', [UserManagementController::class, 'updateUserProfile']);
        })
        ->add(AdminMiddleware::class)
        ->add(JwtMiddleware::class);
    }
}
