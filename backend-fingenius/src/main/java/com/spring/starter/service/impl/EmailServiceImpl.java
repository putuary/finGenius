package com.spring.starter.service.impl;

import com.spring.starter.model.entity.User;
import com.spring.starter.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final ResourceLoader resourceLoader;
    @Override
    public void sendForgotPasswordEmail(User user, String resetLink) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, "UTF-8");

        String html = readHtmlTemplate("classpath:templates/forgot-password.html");
        html = html.replace("{{username}}", user.getFullname());
        html = html.replace("{{resetLink}}", resetLink);

        helper.setTo(user.getEmail());
        helper.setSubject("Reset Password");
        helper.setText(html, true);
        helper.setFrom("fingenius.co@gmail.com");

        mailSender.send(message);
    }

    public String readHtmlTemplate(String filePath) throws IOException {
        Resource resource = resourceLoader.getResource(filePath);
        return new String(Files.readAllBytes(Paths.get(resource.getURI())));
    }
}
