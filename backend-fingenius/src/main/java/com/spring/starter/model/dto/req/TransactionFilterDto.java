package com.spring.starter.model.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionFilterDto {

    private String query;
    private String filterBy;
    private String filter;
    private String startDate;
    private String endDate;
}
