package com.spring.starter.repository;

import com.spring.starter.model.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, String> {
    PasswordResetToken findByToken(String token);
    List<PasswordResetToken> findByExpiryDateBefore(Date date);
}
