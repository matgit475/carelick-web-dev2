<?php
namespace App\Modules\Event;
use Slim\App;
use App\Modules\Event\EventController;

class EventRoutes
{
    public static function map(App $app){
        $app->group('/events', function ($group) {
            $group->get('', [ EventController::class, 'getPublicEvents']);
            $group->get('/{id}', [EventController::class, 'getEventById']);
        });
    }
}
