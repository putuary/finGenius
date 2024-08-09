package com.spring.starter.service.impl;

import com.spring.starter.model.dto.res.ResponseBudgetingDto;
import com.spring.starter.model.dto.res.TransactionDetailResponseDto;
import com.spring.starter.model.entity.Transaction;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.CategoryRepository;
import com.spring.starter.model.dto.req.BudgetingDto;
import com.spring.starter.model.entity.Budgeting;
import com.spring.starter.model.entity.Category;
import com.spring.starter.repository.BudgetingRepository;
import com.spring.starter.repository.TransactionRepository;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.service.BudgetingService;
import com.spring.starter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetingServiceImpl implements BudgetingService {

    private final BudgetingRepository budgetingRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<ResponseBudgetingDto> getBudgetingAuthUser() {
       User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
               () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
       );
       List<Budgeting> budgeting = budgetingRepository.findAllByUserId(user.getId());
       return budgeting.stream().map(budgeting1 -> ResponseBudgetingDto.builder()
               .id(budgeting1.getId())
               .userId(user.getId())
               .categoryId(budgeting1.getCategory().getId())
               .categoryName(budgeting1.getCategory().getName())
               .amount(budgeting1.getAmount())
               .isActive(budgeting1.isActive())
               .createdAt(budgeting1.getCreatedAt())
               .updatedAt(budgeting1.getUpdatedAt())
               .build()).toList();
    }

    @Override
    public ResponseBudgetingDto getBudgetingAuthUserById(String id) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        Budgeting budgeting = budgetingRepository.findByIdAndUserId(id, user.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budgeting Not Found")
        );
        return ResponseBudgetingDto.builder()
                .userId(user.getId())
                .categoryId(budgeting.getCategory().getId())
                .categoryName(budgeting.getCategory().getName())
                .amount(budgeting.getAmount())
                .isActive(budgeting.isActive())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(budgeting.getUpdatedAt())
                .build();

    }

    @Override
    public ResponseBudgetingDto saveBudgeting(BudgetingDto budgetingDto) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );
        Category category = categoryRepository.findById(budgetingDto.getCategoryId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );
        Budgeting budgeting = Budgeting.builder()
                .user(user)
                .category(category)
                .amount(budgetingDto.getAmount())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        budgetingRepository.save(budgeting);
        return ResponseBudgetingDto.builder()
                .id(budgeting.getId())
                .userId(user.getId())
                .categoryId(budgeting.getCategory().getId())
                .categoryName(budgeting.getCategory().getName())
                .amount(budgeting.getAmount())
                .isActive(budgeting.isActive())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(budgeting.getUpdatedAt())
                .build();
    }

    @Override
    public ResponseBudgetingDto updateAmountBudgeting(String id, BudgetingDto budgetingDto) {
        Category categoryExist = categoryRepository.findById(budgetingDto.getCategoryId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );
        Budgeting budgeting = budgetingRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget Not Found")
        );

        Budgeting updateBudget = Budgeting.builder()
                .id(id)
                .user(budgeting.getUser())
                .category(categoryExist)
                .amount(budgetingDto.getAmount())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(new Date())
                .build();
        budgetingRepository.save(updateBudget);
        return ResponseBudgetingDto.builder()
                .id(id)
                .userId(budgeting.getUser().getId())
                .categoryId(budgeting.getCategory().getId())
                .categoryName(budgeting.getCategory().getName())
                .amount(budgeting.getAmount())
                .isActive(budgeting.isActive())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(new Date())
                .build();
    }

    @Override
    public ResponseBudgetingDto updateActiveBudgeting(String id) {
        Budgeting budgeting = budgetingRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget Not Found")
        );
        ResponseBudgetingDto responseBudgetingDto = ResponseBudgetingDto.builder()
                .id(id)
                .userId(budgeting.getUser().getId())
                .categoryId(budgeting.getCategory().getId())
                .categoryName(budgeting.getCategory().getName())
                .amount(budgeting.getAmount())
                .isActive(!budgeting.isActive())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(new Date())
                .build();

        Budgeting updateActiveBudget = Budgeting.builder()
                .id(responseBudgetingDto.getId())
                .user(budgeting.getUser())
                .category(budgeting.getCategory())
                .amount(budgeting.getAmount())
                .createdAt(budgeting.getCreatedAt())
                .updatedAt(new Date())
                .isActive(!budgeting.isActive())
                .build();
        budgetingRepository.save(updateActiveBudget);
        return responseBudgetingDto;
    }

    @Override
    public void infoLimitBudgeting() {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );
    }

    @Override
    public void deleteBudgeting(String id) {
        if(budgetingRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).isPresent()) {
            budgetingRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget Not Found");
        }
    }
}
