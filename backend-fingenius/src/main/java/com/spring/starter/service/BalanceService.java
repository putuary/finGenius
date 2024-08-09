package com.spring.starter.service;

import com.spring.starter.model.dto.req.BalancePushRequestDto;

public interface BalanceService {
    void pushBalance(BalancePushRequestDto balancePushRequestDto);
    void updateBalanceSaving(Long amount);
    void updateBalanceAsset(Long amount);
}
