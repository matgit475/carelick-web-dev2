<?php

namespace App\Modules\Auth\AuthDto;

class LoginDto
{
    public string $email;
    public string $password;

    public function __construct() {
        $this->email = "";
        $this->password = "";
    }

    public function fromArray(array $data) {

        $this->email = strtolower(trim($data['email'] ?? ''));
        $this->password = $data['password'] ?? '';
        return $this;
    }
}