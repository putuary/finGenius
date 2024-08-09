package com.spring.starter.model.dto.req;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TypeDto {
    @NotNull(message = "name shouldn't be null")
    private String name;
}
