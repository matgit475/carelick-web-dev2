<?php
namespace App\Shared\Mail;

class EmailManager {
    private Mailer $mailer;

    public function __construct(Mailer $mailer) {
        $this->mailer = $mailer;
    }

    public function getBody($template,$data){
        // Start output buffering
        ob_start();
        $path = __DIR__ . "/Templates/{$template}.php";
        include($path);
        return ob_get_clean();
    }

    public function sendPasswordResetEmail(string $email, string $token ): bool {
        // Send email with the new password
        $subject = "Password Reset Request";
        $body = $this->getBody('passwordReset',["email"=>$email, "token"=> $token]);
        return $this->mailer->sendEmail($email, $subject, $body);
    }

    public function sendOtpEmail(string $email, string $otp) : bool {
        //Send email with the otp
        $subject = "Your Verification Code for Carelick Association for Development Inc.";
        $body = $this->getBody('otp', ["email"=>$email, "otp"=> $otp]);
        return $this->mailer->sendEmail($email, $subject, $body);
    }
}