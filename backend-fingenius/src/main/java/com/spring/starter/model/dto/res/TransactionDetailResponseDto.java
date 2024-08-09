package com.spring.starter.model.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailResponseDto {
    private List<TransactionResponseDto> Transactions;
    private Long totalAmount;
}
