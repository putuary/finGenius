package com.spring.starter.service;

import com.spring.starter.model.dto.req.TransactionCategorySumReqDto;
import com.spring.starter.model.dto.req.TransactionFilterDto;
import com.spring.starter.model.dto.req.TransactionRequestDto;
import com.spring.starter.model.dto.res.TransactionCategorySumDto;
import com.spring.starter.model.dto.res.TransactionDetailResponseDto;
import com.spring.starter.model.dto.res.TransactionResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface TransactionService {
    List<TransactionResponseDto> getAllTransactions();
    TransactionDetailResponseDto getAllTransactionsWithFilter(TransactionFilterDto transactionFilterDto);
    Page<TransactionResponseDto> getAllTransactions(String query, Pageable pageable);
    //List<TransactionCategorySumDto> getTransactionCategorySum(TransactionCategorySumReqDto transactionCategorySumReqDto);
    List<TransactionCategorySumDto> findTransactionCategorySum(TransactionCategorySumReqDto transactionCategorySumReqDto);

    TransactionResponseDto getTransactionById(String id);
    TransactionResponseDto saveTransaction(TransactionRequestDto transactionRequestDto);
    TransactionResponseDto updateTransaction(String id, TransactionRequestDto transactionRequestDto);
    void deleteTransaction(String id);
}
