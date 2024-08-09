package com.spring.starter.service;

import com.spring.starter.model.dto.req.RewardDto;
import com.spring.starter.model.entity.RewardActivity;

import java.util.List;

public interface RewardService {
    List<RewardActivity> getAllRewardActivity();
    RewardActivity getRewardActivityById(String id);
    RewardActivity saveRewardActivity(RewardDto rewardDto);
    RewardActivity updateRewardActivity(String id, RewardDto rewardDto);
    void addRewardActivityToUser();
    void deleteRewardActivity(String id);
}
