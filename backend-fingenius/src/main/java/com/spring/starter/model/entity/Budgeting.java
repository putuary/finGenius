package com.spring.starter.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "mst_budgeting")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budgeting {

    @Id
    @Column(name = "budgeting_id")
    private String id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    private Long amount;
    private boolean isActive = false;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void prefixId() {
        this.id = "budgeting-" + UUID.randomUUID();
    }
}
