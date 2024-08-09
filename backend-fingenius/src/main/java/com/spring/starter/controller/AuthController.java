package com.spring.starter.controller;

import com.spring.starter.model.dto.req.*;
import com.spring.starter.model.dto.res.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.spring.starter.service.AuthService;
import com.spring.starter.utils.constant.ApiPathConstant;
import com.spring.starter.utils.constant.ERole;

import jakarta.validation.Valid;

import java.util.Date;


@RestController
@CrossOrigin
@RequestMapping(
  ApiPathConstant.API +
  ApiPathConstant.VERSION +
  ApiPathConstant.AUTH
)
@Validated
public class AuthController {
  
  @Autowired
  private AuthService authService;

  @PostMapping("register")
  public ResponseEntity<CommonResponseDto<UserResponseDto>>
  registerUserHandler(
    @Valid
    @RequestBody
    RegisterRequestDto registerRequestDto
  ) {

    if (!registerRequestDto.getEmail().contains("@")) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CommonResponseDto<>());
    }
    
    return ResponseEntity
    .status(HttpStatus.CREATED)
    .body(
      new CommonResponseDto<>(
        HttpStatus.CREATED.value(),
        "SuccessFully Registered User",
        authService.registerUser(registerRequestDto, ERole.ADMIN)
      )
    );
  }

  @PostMapping("register/user")
  public ResponseEntity<CommonResponseDto<UserResponseDto>>
  registerCommonUserHandler(
    @Valid
    @RequestBody
    RegisterRequestDto registerRequestDto
  ) {
    return ResponseEntity
    .status(HttpStatus.CREATED)
    .body(
      new CommonResponseDto<>(
        HttpStatus.CREATED.value(),
        "SuccessFully Registered User",
        authService.registerUser(registerRequestDto, ERole.USER)
      )
    );
  }

  @PostMapping("login")
  public ResponseEntity<CommonResponseDto<LoginResponseDto>>
  LoginHandler(
    @RequestBody
    LoginRequestDto loginRequestDto
  ) {
    return ResponseEntity
    .status(HttpStatus.OK)
    .body(
      new CommonResponseDto<>(
        HttpStatus.OK.value(),
        "SuccessFully Logged In",
        authService.login(loginRequestDto)
      )
    );
  }


  @PutMapping("refresh-token")
  public ResponseEntity<CommonResponseDto<RefreshAccessTokenDto>>
  refreshAccessTokenHandler(
    @RequestBody
    RequestRefreshTokenDto requestRefreshTokenDto
  ) {
    return ResponseEntity
    .status(HttpStatus.OK)
    .body(
      new CommonResponseDto<>(
        HttpStatus.OK.value(),
        "SuccessFully Refreshed Access Token",
        authService.refreshAccessToken(requestRefreshTokenDto)
      )
    );
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<ResponseMessageDto> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
    System.out.println(forgotPasswordDto);
    authService.createPasswordResetToken(forgotPasswordDto.getEmail());
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ResponseMessageDto(
                    HttpStatus.OK.value(),
                    "Password reset link has been sent to your email",
                    new Date()
            ));
  }

  @PostMapping("/reset-password")
  public ResponseEntity<ResponseMessageDto> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
    authService.resetPassword(resetPasswordDto);
    return ResponseEntity
            .status(HttpStatus.OK)
            .body(new ResponseMessageDto(
                    HttpStatus.OK.value(),
                    "Password has been reset successfully",
                    new Date()
            ));
  }


}
