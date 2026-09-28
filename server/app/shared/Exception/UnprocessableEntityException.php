<?php
namespace App\Shared\Exception;
use RuntimeException;

class UnprocessableEntityException extends RuntimeException {
    public function __construct($message = "Unprocessable Entity", $code = 422) {
        parent::__construct($message, $code);
    }
}