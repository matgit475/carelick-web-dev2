<?php
namespace App\Modules\Profession;
use Slim\App;
use App\Modules\Profession\ProfessionController;
use App\Shared\Middleware\JwtMiddleware;

class ProfessionRoutes
{
    public static function map(App $app){
        $app->group('/professions', function ($group) {
            $group->get('', [ProfessionController::class, 'getAllProfessions']);
        })->add(JwtMiddleware::class);
    }
}
