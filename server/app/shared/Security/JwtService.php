<?php

namespace App\Shared\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JwtService
{
    private string $secret;

    public function __construct(){
        $this->secret = $_ENV['JWT_SECRET'];
    }

    public function encode($userId, $role, $email, $first_name, $account_verified) {
        $payload = [
            "iat" => time(),            // Issued at
            "exp" => time() + 3600,     // Expiry (1 hour)
            "sub" => $userId,           // User ID
            "role" => $role,
            "email"=> $email,
            "first_name"=> $first_name,
            "account_verified"=> $account_verified
        ];
        return JWT::encode($payload, $this->secret, 'HS256');
    }

    public function decode($token) {
        return JWT::decode($token, new Key($this->secret, 'HS256'));
    }
}