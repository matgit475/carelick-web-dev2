<?php
namespace App\Shared\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {
    private $mail;

    public function __construct() {
        $this->mail = new PHPMailer(true);

        // SMTP Configuration
        $this->mail->isSMTP();
        $this->mail->Host = 'mail.e2mlink.com'; // Your SMTP host
        $this->mail->SMTPAuth = true;
        $this->mail->Username = 'info@e2mlink.com'; // Your email
        $this->mail->Password = 'iE$n3h%2h7'; // Your email password or app password
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = 587;

        // Default sender
        $this->mail->setFrom('info@e2mlink.com', 'Muhammad Sumair Dagiya');
    }

    public function sendEmail($to, $subject, $body) {
        $this->mail->addAddress($to);
        $this->mail->Subject = $subject;
        $this->mail->isHTML(true);
        $this->mail->Body = $body;
        if (!$this->mail->send()) {
            echo "Mailer Error: " . $this->mail->ErrorInfo;
            return false;
        }
        return true;
    }
}