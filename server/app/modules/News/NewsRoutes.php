<?php
namespace App\Modules\News;
use Slim\App;
use App\Modules\News\NewsController;

class NewsRoutes
{
    public static function map(App $app){
        $app->group('/news', function ($group) {
            $group->get('', [NewsController::class, 'getPublicNews']);
        });
    }
}
