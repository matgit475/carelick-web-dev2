<?php

namespace App\Modules\Account;

class AccountSettingsDto
{
    public string $firstName;
    public string $lastName;
    public string $phone;
    public string $middleName;
    public string $newPassword;
    public string $retypePassword;
    public function __construct() {
        $this->firstName = "";
        $this->lastName = "";
        $this->phone = "";
        $this->middleName = "";
        $this->newPassword = "";
        $this->retypePassword = "";
    }

    public function fromArray(array $data)
    {
        $this->firstName = trim($data['first_name'] ?? "");
        $this->lastName = trim($data['last_name'] ?? "");
        $this->phone = trim($data['phone'] ?? "");
        $this->middleName = trim($data['middle_name'] ?? "");
        $this->newPassword =  trim($data['new_password']  ?? "") ;
        $this->retypePassword = trim($data['new_password'] ?? "" );
        return $this;
    }

    public function isPasswordSet(){
        if ($this->newPassword === "") return false;
        return true;
    }

    public function toPersonalDetailsArray(): array
    {
        return [
            'first_name' => $this->firstName,
            'middle_name' => $this->middleName,
            'last_name' => $this->lastName,
            'phone' => $this->phone,
        ];
    }
}