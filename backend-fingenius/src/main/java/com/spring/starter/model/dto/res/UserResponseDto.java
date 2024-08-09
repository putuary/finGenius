package com.spring.starter.model.dto.res;

import java.util.Date;
import java.util.List;

import com.spring.starter.model.entity.RewardActivity;
import com.spring.starter.utils.constant.ERole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
  
  private String id;
  private String fullname;
  private String email;
  private String avatar;
  private ERole role;
  private Long balance;
  private Long balanceSaving;
  private Long balanceAsset;
  private Integer streak;
  private List<RewardActivity> rewardActivities;
  private Date createdAt;
  private Date updatedAt;

}
