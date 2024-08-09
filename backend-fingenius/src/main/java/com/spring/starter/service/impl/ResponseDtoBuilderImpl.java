package com.spring.starter.service.impl;

import com.spring.starter.model.dto.res.TransactionDetailResponseDto;
import com.spring.starter.model.dto.res.TransactionResponseDto;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.*;
import org.springframework.stereotype.Service;

import com.spring.starter.service.ResponseDtoBuilder;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResponseDtoBuilderImpl implements ResponseDtoBuilder {

  @Override
  public UserResponseDto userResponseTransformer(User user) {
      return UserResponseDto.builder()
            .id(user.getId())
            .fullname(user.getFullname())
            .email(user.getEmail())
            .avatar(user.getAvatar())
            .role(user.getRole())
            .balance(user.getBalance())
            .balanceSaving(user.getBalanceSaving())
            .balanceAsset(user.getBalanceAsset())
            .streak(user.getStreak())
            .rewardActivities(user.getRewardActivity())
            .updatedAt(user.getUpdatedAt())
            .createdAt(user.getCreatedAt())
            .build();
  }

  @Override
  public AppUser appUserTransformer(User user) {
      return AppUser.builder()
            .id(user.getId())
            .email(user.getEmail())
            .password(user.getPassword())
            .role(user.getRole())
            .build();
  }

  @Override
  public TransactionResponseDto transactionResponseTransformer(Transaction transaction) {
      return TransactionResponseDto.builder()
              .id(transaction.getId())
              .name(transaction.getName())
              .description(transaction.getDescription())
              .category(transaction.getCategory())
              .amount(transaction.getAmount())
              .createdAt(transaction.getCreatedAt())
              .updatedAt(transaction.getUpdatedAt())
              .build();
  }
   @Override
   public Map<String, TransactionDetailResponseDto> getTransactionsAndSumByCategoryType(List<Transaction> transactions) {
       return transactions.stream()
               .collect(Collectors.groupingBy(
                       transaction -> transaction.getCategory().getType().getName(),
                       Collectors.collectingAndThen(
                               Collectors.toList(),
                               transList -> new TransactionDetailResponseDto(
                                       transList.stream().map(this::transactionResponseTransformer).toList(),
                                       transList.stream().collect(Collectors.summingLong(Transaction::getAmount))
                               )
                       )
               ));
   }

    @Override
    public Map<String, TransactionDetailResponseDto> getTransactionsAndSumByCategory(List<Transaction> transactions) {
        return transactions.stream()
                .collect(Collectors.groupingBy(
                        transaction -> transaction.getCategory().getName(),
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                transList -> new TransactionDetailResponseDto(
                                        transList.stream().map(this::transactionResponseTransformer).toList(),
                                        transList.stream().collect(Collectors.summingLong(Transaction::getAmount))
                                )
                        )
                ));
    }

    @Override
    public TransactionDetailResponseDto transformToTransactionDetail(List<Transaction> transactions) {
        return new TransactionDetailResponseDto(
                transactions.stream().map(this::transactionResponseTransformer).toList(),
                transactions.stream().collect(Collectors.summingLong(Transaction::getAmount))
        );
    }
}
