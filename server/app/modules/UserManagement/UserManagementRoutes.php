<?php
namespace App\Modules\UserManagement;
use Slim\App;
use App\Modules\UserManagement\UserManagementController;
use App\Shared\Middleware\JwtMiddleware;
use App\Shared\Middleware\AdminMiddleware;
use App\Shared\Middleware\MultiRoleMiddleware;

class UserManagementRoutes
{
    public static function map(App $app){
        $app->group('/users', function ($group) {
            $group->delete('/{id}', [ UserManagementController::class, 'deleteUser' ]);
            $group->post('/settings/{id}', [ UserManagementController::class, 'updateUserSettings']);
            $group->post('/update_password/{id}', [UserManagementController::class, 'updateUserPassword']);
            $group->get('/unverified', [UserManagementController::class, 'getUnverifiedUsers']);
        })
        ->add(AdminMiddleware::class)
        ->add(JwtMiddleware::class);

        $app->group('/users', function ($group) {
            $group->get('', [ UserManagementController::class, 'getUsers' ]);
            $group->get('/settings/{id}', [ UserManagementController::class, 'getUserSettings' ]);
        })
        ->add(new MultiRoleMiddleware([ 'admin', 'subadmin']))
        ->add(JwtMiddleware::class);
    }
}
