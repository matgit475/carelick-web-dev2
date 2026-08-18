<?php

namespace App\Shared\Dto;

class UpdateProfileDto
{
    public string $surname;
    public string $fatherName;

    public function __construct() {
        $this->surname = "";
        $this->fatherName = "";
  
    }

    public function fromArray(array $data)
    {
        $this->surname = trim($data['surname']);
        $this->fatherName = trim($data['father_name']);
        return $this;
    }

    public function toArray(): array
    {
        return [
            'surname' => $this->surname,
            'father_name' => $this->fatherName,
        ];
    }


}