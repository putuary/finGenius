package com.spring.starter.service;

import com.spring.starter.model.entity.User;
import jakarta.mail.MessagingException;

import java.io.IOException;

public interface EmailService {

    void sendForgotPasswordEmail(User user, String resetLink) throws MessagingException, IOException;
}
