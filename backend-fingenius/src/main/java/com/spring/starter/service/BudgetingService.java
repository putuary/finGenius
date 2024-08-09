package com.spring.starter.service;

import com.spring.starter.model.dto.req.BudgetingDto;
import com.spring.starter.model.dto.res.ResponseBudgetingDto;

import java.util.List;

public interface BudgetingService {
    List<ResponseBudgetingDto> getBudgetingAuthUser();
    ResponseBudgetingDto getBudgetingAuthUserById(String id);
    ResponseBudgetingDto saveBudgeting(BudgetingDto budgetingDto);
    ResponseBudgetingDto updateAmountBudgeting(String id, BudgetingDto budgetingDto);
    ResponseBudgetingDto updateActiveBudgeting(String id);
    void infoLimitBudgeting();
    void deleteBudgeting(String id);

}
