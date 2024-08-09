package com.spring.starter.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.spring.starter.model.dto.req.LoginRequestDto;
import com.spring.starter.model.dto.req.RegisterRequestDto;
import com.spring.starter.model.dto.req.RequestRefreshTokenDto;
import com.spring.starter.model.dto.req.ResetPasswordDto;
import com.spring.starter.model.dto.res.LoginResponseDto;
import com.spring.starter.model.dto.res.RefreshAccessTokenDto;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.AppUser;
import com.spring.starter.model.entity.PasswordResetToken;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.PasswordResetTokenRepository;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.security.JwtUtils;
import com.spring.starter.service.AuthService;
import com.spring.starter.service.EmailService;
import com.spring.starter.service.ResponseDtoBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.spring.starter.utils.constant.ERole;

import jakarta.transaction.Transactional;

import static org.antlr.v4.runtime.misc.Utils.readFile;

@Service
public class AuthServiceImpl implements AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private ResponseDtoBuilder responseDtoBuilder;

  @Autowired
  private PasswordResetTokenRepository passwordResetTokenRepository;

  @Autowired
  private EmailService emailService;


  @Override
  @Transactional
  public UserResponseDto registerUser(RegisterRequestDto registerRequestDto, ERole role) {
    try {

      User user = User.builder()
      .email(registerRequestDto.getEmail())
      .password(this.passwordEncoder.encode(registerRequestDto.getPassword()))
      .fullname(registerRequestDto.getFullname())
      .role(role)
      .balance(0L)
      .balanceSaving(0L)
      .balanceAsset(0L)
      .streak(0)
      .createdAt(new Date())
      .updatedAt(new Date())
      .build();

      this.userRepository.save(user);

      return this.responseDtoBuilder.userResponseTransformer(user);

    } catch (DataIntegrityViolationException e) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists!");
    }
  }

  @Override
  public LoginResponseDto login(LoginRequestDto loginRequestDto) {
    try {
      Authentication authentication = this.authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
          loginRequestDto.getEmail(),
          loginRequestDto.getPassword())
      );

      SecurityContextHolder.getContext().setAuthentication(authentication);
      AppUser appUser = (AppUser) authentication.getPrincipal();

      String accessToken = this.jwtUtils.generatedAccessToken(appUser);
      String refreshToken = this.jwtUtils.generatedRefreshToken(appUser);

      return LoginResponseDto.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .build();

    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials!");
    }
  }


  @Override
  public RefreshAccessTokenDto refreshAccessToken(RequestRefreshTokenDto requestRefreshTokenDto) {
    try {
      return RefreshAccessTokenDto.builder()
      .accessToken(this.jwtUtils.refreshAccessToken(requestRefreshTokenDto.getRefreshToken()))
      .build();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid RefreshToken");
    }
  }

  @Override
  @Transactional
  public void createPasswordResetToken(String email) {
    User user = userRepository.findByEmail(email).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    );
    String token = UUID.randomUUID().toString();
    System.out.println("show user" + user);

    // Save token to database
    PasswordResetToken myToken = PasswordResetToken.builder()
            .token(token)
            .user(user)
            .expiryDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
            .build();
    passwordResetTokenRepository.save(myToken);
    System.out.println("show token" + myToken);

    String resetLink = "http://localhost:4200/reset-password/" + token;
    try {
      emailService.sendForgotPasswordEmail(user, resetLink);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
  }

  @Override
  public void resetPassword(ResetPasswordDto resetPasswordDto) {
    PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(resetPasswordDto.getToken());
    User user = resetToken.getUser();
    user.setPassword(passwordEncoder.encode(resetPasswordDto.getPassword()));
    userRepository.save(user);
    passwordResetTokenRepository.delete(resetToken);
  }

  @Override
  public void deletePasswordResetTokenExpired() {
    Date currentDate = new Date();
    List<PasswordResetToken> expiredTokens = passwordResetTokenRepository.findByExpiryDateBefore(currentDate);
    passwordResetTokenRepository.deleteAll(expiredTokens);
  }

}
