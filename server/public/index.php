<?php

use Slim\Factory\AppFactory;
use DI\ContainerBuilder;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Dotenv\Dotenv;
use App\Shared\Middleware\CorsMiddleware;
use App\Modules\Auth;
use App\Modules\Auth\AuthRoutes;
use App\Modules\News\NewsRoutes;
use App\Modules\Event\EventRoutes;
use App\Modules\UserManagement\UserManagementRoutes;
use App\Modules\Account\AccountRoutes;
use App\Modules\Profession\ProfessionRoutes;
use App\Modules\Image\ImageRoutes;
use App\Shared\Mail;
use App\Database;

require __DIR__ . '/../vendor/autoload.php';

// Environment Variables
$env = getenv('APP_ENV');

$dotenv = Dotenv::createImmutable(
    dirname(__DIR__),
    ".env.$env"
);
$dotenv->load();

// DI Container
$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions([
    Database::class => function () {
        return new Database(
            $_ENV['DB_HOST'],
            $_ENV['DB_NAME'],
            $_ENV['DB_USER'],
            $_ENV['DB_PASS']
        );
    }
]);

// Create App
$container = $containerBuilder->build();
AppFactory::setContainer($container);
$app = AppFactory::create();

// Global Middlewares
$app
->addErrorMiddleware(true, true, true)
->setDefaultErrorHandler(
    function (
        Request $request,
        Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ) use ($app) {
        if ($exception instanceof DI\DependencyException) throw $exception;
        if (!$exception instanceof Exception) throw $exception;
        $status = $exception->getCode();
        $response = $app->getResponseFactory()->createResponse($status);
        $response->getBody()->write(json_encode([
            "success" => false,
            "message" => $exception->getMessage(),
            "status" => $status
        ]));
        return $response->withHeader("Content-Type", "application/json");
    }
);
$app->addBodyParsingMiddleware();
$app->add(CorsMiddleware::class);
// Routes
AuthRoutes::map($app);
NewsRoutes::map($app);
EventRoutes::map($app);
AccountRoutes::map($app);
UserManagementRoutes::map($app);
ProfessionRoutes::map($app);
ImageRoutes::map($app);

$app->run();



