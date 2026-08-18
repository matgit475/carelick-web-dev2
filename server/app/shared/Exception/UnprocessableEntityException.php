<?php
namespace App\Shared\Exception;
use Exception;

class UnprocessableEntityException extends Exception {
    public function __construct($message = "Unprocessable Entity", $code = 422) {
        parent::__construct($message, $code);
    }
}