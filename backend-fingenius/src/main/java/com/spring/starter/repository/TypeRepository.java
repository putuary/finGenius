package com.spring.starter.repository;

import com.spring.starter.model.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeRepository extends JpaRepository<Type, String> {
    Optional<Type> findByName(String name);
}
