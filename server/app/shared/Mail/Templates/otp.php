<p>Hi,</p>
<p>To continue using your account on 
<strong>Carelick Association for Development Inc.</strong>, please login with OTP to verfiy your email!</p>
<div style="font-size: 24px; font-weight: bold; margin: 10px 0;">
	<?php echo $data['otp']; ?>
</div>
<p>Click <a href="<?php echo $_ENV['CLIENT_URL'] ?>/auth/verify-otp?email=<?php echo $data['email']; ?>">Here</a> to enter your code and verify your account.</p>
<p>If you didn't request this, you can safely ignore this email.</p>
<p>Thanks,<br/>The Carelick Association for Development Inc. Team</p>