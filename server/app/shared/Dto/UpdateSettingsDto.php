<?php

namespace App\Shared\Dto;

class UpdateSettingsDto
{
    public string $firstName;
    public string $lastName;
    public string $phone;
    public string $middleName;

    public function __construct() {
        $this->firstName = "";
        $this->lastName = "";
        $this->phone = "";
        $this->middleName = "";
  
    }

    public function fromArray(array $data)
    {
        $this->firstName = trim($data['first_name']);
        $this->lastName = trim($data['last_name']);
        $this->phone = trim($data['phone']);
        $this->middleName = trim($data['middle_name']);
        return $this;
    }

    public function toArray(): array
    {
        return [
            'first_name' => $this->firstName,
            'middle_name' => $this->middleName,
            'last_name' => $this->lastName,
            'phone' => $this->phone,
        ];
    }


}