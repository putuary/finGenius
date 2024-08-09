package com.spring.starter.model.entity;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spring.starter.utils.constant.ERole;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mst_users")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  
  @Id
  @Column(name = "user_id")
  private String id;

  @Column(nullable = false, unique = true)
  private String email;

  private String password;

  private String fullname;

  @Enumerated(EnumType.STRING)
  private ERole role;

  private String avatar;

  private Long balance;

  private Long balanceSaving;

  private Long balanceAsset;

  private Integer streak;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "t_user_reward",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "reward_id")
  )
  private List<RewardActivity> rewardActivity;

  @OneToMany(mappedBy = "user")
  @JsonManagedReference
  private List<Transaction> transactions;

  private Date createdAt;

  private Date updatedAt;

  @PrePersist
  public void prefixId() {
    this.id = "user-" + UUID.randomUUID();
  }
}
