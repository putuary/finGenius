package com.spring.starter.service;

import com.spring.starter.model.dto.res.TransactionDetailResponseDto;
import com.spring.starter.model.dto.res.TransactionResponseDto;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.*;

import java.util.List;
import java.util.Map;

public interface ResponseDtoBuilder {
  UserResponseDto userResponseTransformer(User user);
  AppUser appUserTransformer(User user);
  TransactionResponseDto transactionResponseTransformer(Transaction transaction);


  Map<String, TransactionDetailResponseDto> getTransactionsAndSumByCategoryType(List<Transaction> transactions);
  Map<String, TransactionDetailResponseDto> getTransactionsAndSumByCategory(List<Transaction> transactions);
  TransactionDetailResponseDto transformToTransactionDetail(List<Transaction> transactions);
}
