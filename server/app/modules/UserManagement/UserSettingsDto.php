<?php

namespace App\Modules\UserManagement;

class UserSettingsDto
{
    public string $firstName;
    public string $lastName;
    public string $phone;
    public string $middleName;
    public string $groupName;
    public string $newPassword;
    public string $retypePassword;

    public function __construct() {
        $this->firstName = "";
        $this->lastName = "";
        $this->phone = "";
        $this->middleName = "";
        $this->newPassword = "";
        $this->retypePassword = "";
        $this->groupName = "";
    }

    public function fromArray(array $data)
    {
        $this->firstName = trim($data['first_name']);
        $this->lastName = trim($data['last_name']);
        $this->phone = trim($data['phone']);
        $this->middleName = trim($data['middle_name']);
        $this->groupName = trim($data['group_name']);
        $this->newPassword =  trim($data['new_password']  ?? "") ;
        $this->retypePassword = trim($data['new_password'] ?? "" );
        return $this;
    }

    public function toPersonalDetailsArray(): array
    {
        return [
            'first_name' => $this->firstName,
            'middle_name' => $this->middleName,
            'last_name' => $this->lastName,
            'phone' => $this->phone
        ];
    }

    function isPasswordSet(){
        if ($this->newPassword === "") return false;
        return true;
    }
}