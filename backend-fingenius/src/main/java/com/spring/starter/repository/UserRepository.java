package com.spring.starter.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.spring.starter.model.entity.User;
import com.spring.starter.utils.constant.ERole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  List<User> findAllByRole(ERole role);
  Page<User> findAllByRole(ERole role, Pageable pageable);
  Optional<User> findByEmail(String email);
  Page<User> findByFullnameIgnoreCaseContainingOrEmailIgnoreCaseContainingAndRoleIgnoreCaseContaining(String fullname, String email, ERole role,Pageable pageable);

  @Transactional
  @Modifying
  @Query("UPDATE User u SET u.streak = 0 WHERE u.role = USER AND u.id NOT IN (SELECT t.user.id FROM Transaction t WHERE t.createdAt BETWEEN :startOfYesterday AND :endOfYesterday)")
  void resetStreakForUsersWithoutTransactionsYesterday(@Param("startOfYesterday") Date startOfYesterday, @Param("endOfYesterday") Date endOfYesterday);
}
