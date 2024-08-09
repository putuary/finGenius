package com.spring.starter.advice;

import java.util.Date;

import com.spring.starter.model.dto.res.ResponseMessageDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<ResponseMessageDto> handleResponseStatusException(ResponseStatusException exception) {
    return ResponseEntity
    .status(exception.getStatusCode())
    .body(
      new ResponseMessageDto(
        exception.getStatusCode().value(),
        exception.getReason(),
        new Date()
      )
    );
  }
  
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ResponseMessageDto> handleDataIntegrityViolationException(DataIntegrityViolationException exception) {
    return ResponseEntity
    .status(HttpStatus.CONFLICT)
    .body(
      new ResponseMessageDto(
        HttpStatus.CONFLICT.value(),
        exception.getMessage(),
        new Date()
      )
    );
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ResponseMessageDto> handleAccessDeniedException(Exception ex) {
    return ResponseEntity
    .status(HttpStatus.FORBIDDEN)
    .body(
      new ResponseMessageDto(
        HttpStatus.FORBIDDEN.value(),
        ex.getMessage(),
        new Date()
      )
    );
  }

}
