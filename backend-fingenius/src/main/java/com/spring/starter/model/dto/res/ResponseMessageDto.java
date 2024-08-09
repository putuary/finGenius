package com.spring.starter.model.dto.res;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseMessageDto {
  
  private int code;
  private String message;
  private Date time = new Date();

}
