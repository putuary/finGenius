package com.spring.starter.repository;

import com.spring.starter.model.dto.res.TransactionCategorySumDto;
import com.spring.starter.model.entity.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND DAY(t.createdAt) = :day AND MONTH(t.createdAt) = :month AND YEAR(t.createdAt) = :year" )
    List<Transaction> findByUserIdAndCreatedAt(@Param("userId") String userId, @Param("day") Integer day, @Param("month") Integer month, @Param("year") Integer year);

    List<Transaction> findAllByUserId(String userId);

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND " +
            "(LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
            "t.createdAt BETWEEN :startDate AND :endDate")
    List<Transaction> findByAllByUserIdWithQuery(@Param("query") String query, @Param("userId") String userId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.category.id = :categoryId AND " +
            "(LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
            "t.createdAt BETWEEN :startDate AND :endDate")
    List<Transaction> findByUserIdAndCategoryId(@Param("query") String query, @Param("userId") String userId, @Param("categoryId") String categoryId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);


    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.category.type.id = :typeId AND " +
            "(LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
            "t.createdAt BETWEEN :startDate AND :endDate")
    List<Transaction> findByCategoryTypeId(@Param("query") String query, @Param("userId") String userId, @Param("typeId") String typeId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

    Page<Transaction> findAllByUserId(String userId, Pageable pageable);
    Page<Transaction> findByNameIgnoreCaseContainingOrDescriptionIgnoreCaseContainingAndUserId(String name, String description, String userId, Pageable pageable);
    Optional<Transaction> findByIdAndUserId(String id, String userId);

}
