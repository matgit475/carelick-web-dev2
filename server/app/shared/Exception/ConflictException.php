<?php 
namespace App\Shared\Exception;
use RuntimeException;

class ConflictException extends RuntimeException {
    public function __construct($message = "Conflict", $code = 409) {
        parent::__construct($message, $code);
    }
}