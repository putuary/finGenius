package com.spring.starter.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "mst_types")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {

    @Id
    @Column(name = "type_id")
    private String id;
    private String name;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    public void prefixId() {
        this.id = "type-" + UUID.randomUUID();
    }
}
