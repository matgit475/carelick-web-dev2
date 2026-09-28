<?php
namespace App\Shared\Exception;
use RuntimeException;

class NotFoundException extends RuntimeException {
    public function __construct($message = "Not Found", $code = 404) {
        parent::__construct($message, $code);
    }
}