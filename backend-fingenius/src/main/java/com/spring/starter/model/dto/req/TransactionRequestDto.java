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
public class TransactionRequestDto {
    @NotNull(message = "name shouldn't be null")
    private String name;
    private String description;
    @NotNull(message = "categoryId shouldn't be null")
    private String categoryId;
    @NotNull(message = "amount shouldn't be null")
    private Long amount;
    private String createdAt;
}
