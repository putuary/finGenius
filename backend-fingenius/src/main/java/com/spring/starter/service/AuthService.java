package com.spring.starter.service;

import com.spring.starter.model.dto.req.LoginRequestDto;
import com.spring.starter.model.dto.req.RegisterRequestDto;
import com.spring.starter.model.dto.req.RequestRefreshTokenDto;
import com.spring.starter.model.dto.req.ResetPasswordDto;
import com.spring.starter.model.dto.res.LoginResponseDto;
import com.spring.starter.model.dto.res.RefreshAccessTokenDto;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.utils.constant.ERole;

public interface AuthService {
  UserResponseDto registerUser(RegisterRequestDto registerRequestDto, ERole role);
  LoginResponseDto login(LoginRequestDto loginRequestDto);
  RefreshAccessTokenDto refreshAccessToken(RequestRefreshTokenDto requestRefreshTokenDto);
  void createPasswordResetToken(String email);
  void resetPassword(ResetPasswordDto resetPasswordDto);
  void deletePasswordResetTokenExpired();
}
