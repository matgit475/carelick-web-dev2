<?php
namespace App\Shared\Exception;
use RuntimeException;

class UnauthorizedException extends RuntimeException {
    public function __construct($message = "Unauthorized", $code = 401) {
        parent::__construct($message, $code);
    }
}