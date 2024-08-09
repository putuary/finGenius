package com.spring.starter.model.dto.res;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionCategorySumDto {
    private String userId;
    private String idCategory;
    private String nameCategory;
    private String colorCategory;
    private Long amountTransactionCategorySum;
    private Double percentageTransactionCategorySum;
}
