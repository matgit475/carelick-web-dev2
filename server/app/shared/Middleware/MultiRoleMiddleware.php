<?php

namespace App\Shared\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use App\Shared\Exception\ForbiddenException;

class MultiRoleMiddleware implements MiddlewareInterface
{
    private array $allowedRoles;

    public function __construct(array $allowedRoles)
    {
        $this->allowedRoles = $allowedRoles;
    }

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {

        $user = $request->getAttribute('user');
        if (!in_array($user['role'], $this->allowedRoles, true)){
            throw new ForbiddenException( "Forbidden - Admin access required");
        }
        return $handler->handle($request);
    }
}