<?php
namespace App\Shared\Dto;

class UpdatePasswordDto
{
    public string $newPassword;
    public string $retypePassword;

    public function __construct() {
        $this->newPassword = "";
        $this->retypePassword = "";
    }

    public function fromArray(array $data)
    {
        $this->newPassword = trim($data['new_password']);
        $this->retypePassword = trim($data['retype_password']);
        return $this;
    }

    public function toArray(): array
    {
        return [
            'new_password' => $this->newPassword,
            'retype_password' => $this->retypePassword,
        ];
    }
}