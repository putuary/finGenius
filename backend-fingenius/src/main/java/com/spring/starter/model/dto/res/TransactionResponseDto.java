package com.spring.starter.model.dto.res;

import com.spring.starter.model.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponseDto {

    private String id;
    private String name;
    private String description;
    private Category category;
    private Long amount;
    private Date createdAt;
    private Date updatedAt;
}
