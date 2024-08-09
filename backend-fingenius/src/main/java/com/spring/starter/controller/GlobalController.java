package com.spring.starter.controller;

import java.util.Date;

import com.spring.starter.model.dto.res.ResponseMessageDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.starter.utils.constant.ApiPathConstant;

@RestController
@RequestMapping(
  ApiPathConstant.API +
  ApiPathConstant.VERSION
)
public class GlobalController {
  
  @GetMapping
  public ResponseEntity<ResponseMessageDto> globalApiHandler() {
    return ResponseEntity
    .status(HttpStatus.OK)
    .body(
      new ResponseMessageDto(
        HttpStatus.OK.value(),
        "Hello Spring Boot",
        new Date()
      )
    );
  }

}
