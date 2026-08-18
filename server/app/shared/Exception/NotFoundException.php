<?php
namespace App\Shared\Exception;
use Exception;

class NotFoundException extends Exception {
    public function __construct($message = "Not Found", $code = 404) {
        parent::__construct($message, $code);
    }
}