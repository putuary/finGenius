package com.spring.starter.utils.specification;

import com.spring.starter.model.dto.req.TransactionFilterDto;
import com.spring.starter.model.entity.Transaction;
import org.springframework.data.jpa.domain.Specification;

public class TransactionSpecification {
    public static Specification<Transaction> getSpecification(TransactionFilterDto transactionFilterDto) {
        return null;
    }
}
