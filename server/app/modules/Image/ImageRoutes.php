<?php
namespace App\Modules\Image;
use Slim\App;
use App\Modules\Image\ImageController;

class ImageRoutes
{
    public static function map(App $app){
        $app->group('/image', function ($group) {
            $group->get('/{file_name}', [ImageController::class, 'getImage']);
        });
    }
}
