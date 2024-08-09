package com.spring.starter.model.dto.req;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
  @NotNull(message = "name shouldn't be null")
  private String name;
  @NotNull(message = "icon shouldn't be null")
  private String icon;
  @NotNull(message = "color shouldn't be null")
  private String color;
  @NotNull(message = "typeId shouldn't be null")
  private String typeId;
}
