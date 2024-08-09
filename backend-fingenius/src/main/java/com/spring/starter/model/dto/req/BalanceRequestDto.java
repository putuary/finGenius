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
public class BalanceRequestDto {
    @NotNull(message = "balance shouldn't be null")
    private Long balance;
}
