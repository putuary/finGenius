package com.spring.starter.repository;

import com.spring.starter.model.entity.Budgeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetingRepository extends JpaRepository<Budgeting, String> {
    List<Budgeting> findAllByUserId(String userId);
    Optional<Budgeting> findByIdAndUserId(String id, String userId);
}
