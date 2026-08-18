<?php
namespace App\Shared\Exception;
use Exception;

class BadRequestException extends Exception {
    public function __construct($message = "Bad Request", $code = 400) {
        parent::__construct($message, $code);
    }
}