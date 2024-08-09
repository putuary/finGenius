package com.spring.starter.model.dto.req;

import java.util.Date;

import lombok.*;

@Setter
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
  
  private String email;
  private String password;
  private String fullname;
}
