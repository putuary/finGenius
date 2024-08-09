package com.spring.starter.service.impl;

import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.RewardRepository;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.service.RewardService;
import com.spring.starter.model.dto.req.RewardDto;
import com.spring.starter.model.entity.RewardActivity;
import com.spring.starter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RewardServiceImpl implements RewardService {

    private final RewardRepository rewardRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public List<RewardActivity> getAllRewardActivity() {
        return rewardRepository.findAll();
    }

    @Override
    public RewardActivity getRewardActivityById(String id) {
        return rewardRepository.findById(id).orElse(null);
    }

    @Override
    public RewardActivity saveRewardActivity(RewardDto rewardDto) {
        RewardActivity createReward = RewardActivity.builder()
                .name(rewardDto.getName())
                .description(rewardDto.getDescription())
                .linkFile(rewardDto.getLinkFile())
                .streak(rewardDto.getStreak())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        return rewardRepository.save(createReward);
    }

    @Override
    public RewardActivity updateRewardActivity(String id, RewardDto rewardDto) {
        RewardActivity rewardExist = rewardRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found")
        );
        RewardActivity updateReward = RewardActivity.builder()
                .id(id)
                .name(rewardDto.getName())
                .description(rewardDto.getDescription())
                .linkFile(rewardDto.getLinkFile())
                .streak(rewardDto.getStreak())
                .createdAt(rewardExist.getCreatedAt())
                .updatedAt(new Date())
                .build();
        return rewardRepository.save(updateReward);
    }

    public void addRewardActivityToUser() {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        List<RewardActivity> existingRewards = user.getRewardActivity();

        for (RewardActivity rewardActivity : rewardRepository.findAll()) {
            if (rewardActivity.getStreak().equals(user.getStreak()) && !existingRewards.contains(rewardActivity)) {
                existingRewards.add(rewardActivity);
            }
        }

        user.setRewardActivity(existingRewards);
        userRepository.save(user);
    }

    @Override
    public void deleteRewardActivity(String id) {
        rewardRepository.deleteById(id);
    }
}
