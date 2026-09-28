<?php
namespace App\Shared\Exception;
use RuntimeException;

class ForbiddenException extends RuntimeException {
    public function __construct($message = "Forbidden", $code = 403) {
        parent::__construct($message, $code);
    }
}