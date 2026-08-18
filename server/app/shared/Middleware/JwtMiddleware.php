<?php
namespace App\Shared\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use App\Shared\Exception\UnauthorizedException;
use App\Shared\Security\JwtService;

class JwtMiddleware implements MiddlewareInterface
{
    private $jwtService;
    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (empty($_COOKIE['token'])) {
            throw new UnauthorizedException("Unauthorized - No Token Provided");
        }
        
        $token = $_COOKIE['token'];
        $user_data = $this->jwtService->decode($token);

        if (!$user_data) {
            throw new UnauthorizedException("Invalid or Expired Token");
        }

        $payload = [
            "role"=>$user_data->role, 
            "id"=>$user_data->sub,
            "email"=>$user_data->email,
            "first_name"=>$user_data->first_name,
            "account_verified"=>$user_data->account_verified
        ];

        // Attach user data to request
        $request = $request->withAttribute(
            'user',
            $payload
        );

        return $handler->handle($request);
    }
}