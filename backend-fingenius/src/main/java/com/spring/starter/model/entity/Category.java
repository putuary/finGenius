package com.spring.starter.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "mst_categories")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @Column(name = "category_id")
    private String id;
    private String name;
    private String icon;
    private String color;
    @ManyToOne
    @JoinColumn(name = "type_id")
    private Type type;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void prefixId() {
        this.id = "category-" + UUID.randomUUID();
    }
}
