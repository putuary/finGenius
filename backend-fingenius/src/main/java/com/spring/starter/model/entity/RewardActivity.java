package com.spring.starter.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "mst_reward_activities")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RewardActivity {

    @Id
    @Column(name = "reward_id")
    private String id;
    private String name;
    private String description;
    private String linkFile;
    private Integer streak;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void prefixId() {
        this.id = "reward-" + UUID.randomUUID();
    }
}
