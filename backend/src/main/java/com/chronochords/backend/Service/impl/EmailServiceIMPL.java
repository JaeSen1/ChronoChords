package com.chronochords.backend.Service.impl;

import com.chronochords.backend.Entity.User;
import com.chronochords.backend.Service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;


@Service
public class EmailServiceIMPL implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(User user, String token) {
        String resetLink = "http://localhost:3000/reset-password?token=" + token;

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; background-color: #FFF3F3; padding: 20px; border-radius: 10px;'>"
                + "<h2 style='color: #EF9F9F;'>ChronoChords: Password Reset Request</h2>"
                + "<p>Hello, <br/><br/> You have requested to reset your password. Please click the button below to proceed:</p>"
                + "<a href='" + resetLink + "' style='background-color: #EF9F9F; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; margin-top: 20px; border-radius: 5px;'>Reset Password</a>"
                + "<p style='margin-top: 30px;'>If you did not request a password reset, please disregard this email.</p>"
                + "<p style='font-size: 0.8em; color: #666;'>ChronoChords Team</p>"
                + "</div>";

        try {
            helper.setText(htmlMsg, true); // Set to true to send HTML
            helper.setTo(user.getEmail());
            helper.setSubject("Password Reset Request");
            helper.setFrom("noreply.chronochords@gmail.com");
        } catch (MessagingException e) {

        }

        mailSender.send(mimeMessage);
    }
}
