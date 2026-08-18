<?php

namespace App\Modules\Auth\AuthDto;

class RegisterDto
{
    public string $firstName;
    public string $lastName;
    public string $email;
    public string $password;
    public string $confirmPassword;
    public bool $termsAccepted;

    public function __construct() {
        $this->firstName = "";
        $this->lastName = "";
        $this->email = "";
        $this->password = "";
        $this->confirmPassword = "";
        $this->termsAccepted = false;
    }

    public function fromArray(array $data)
    {
        $this->firstName = trim($data['firstName'] ?? '');
        $this->lastName = trim($data['lastName'] ?? '');
        $this->email = strtolower(trim($data['email'] ?? ''));
        $this->password = $data['password'] ?? '';
        $this->confirmPassword = $data['confirmPassword'] ?? '';
        $this->termsAccepted = (bool)($data['termsAccepted'] ?? false);
        return $this;
    }
}