package com.spring.starter.model.dto.res;

import lombok.*;

import java.util.Date;

@Builder
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseBudgetingDto {
    String id;
    String userId;
    String categoryId;
    String categoryName;
    Long amount;
    boolean isActive;
    Date createdAt;
    Date updatedAt;
}
