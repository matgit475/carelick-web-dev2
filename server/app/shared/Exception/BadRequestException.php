<?php
namespace App\Shared\Exception;
use RuntimeException;

class BadRequestException extends RuntimeException {
    public function __construct($message = "Bad Request", $code = 400) {
        parent::__construct($message, $code);
    }
}