<?php 
namespace App\Shared\Exception;
use Exception;

class ConflictException extends Exception {
    public function __construct($message = "Conflict", $code = 409) {
        parent::__construct($message, $code);
    }
}