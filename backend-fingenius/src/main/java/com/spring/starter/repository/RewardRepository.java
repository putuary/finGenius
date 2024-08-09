package com.spring.starter.repository;

import com.spring.starter.model.entity.RewardActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository <RewardActivity, String> {
}
