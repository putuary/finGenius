package com.spring.starter.service.impl;

import com.spring.starter.model.dto.req.TransactionCategorySumReqDto;
import com.spring.starter.model.dto.res.TransactionCategorySumDto;
import com.spring.starter.model.dto.res.TransactionDetailResponseDto;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.TransactionRepository;
import com.spring.starter.service.RewardService;
import com.spring.starter.service.TransactionService;
import com.spring.starter.model.dto.req.TransactionFilterDto;
import com.spring.starter.model.dto.req.TransactionRequestDto;
import com.spring.starter.model.dto.res.TransactionResponseDto;
import com.spring.starter.model.entity.Category;
import com.spring.starter.model.entity.Transaction;
import com.spring.starter.model.entity.Type;
import com.spring.starter.repository.CategoryRepository;
import com.spring.starter.repository.TypeRepository;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.service.ResponseDtoBuilder;
import com.spring.starter.service.UserService;
import com.spring.starter.utils.constant.EType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CategoryRepository categoryRepository;
    private final TypeRepository typeRepository;
    private final ResponseDtoBuilder responseDtoBuilder;
    private final EntityManager entityManager;
    private final RewardService rewardService;


    public boolean isUserTransactionEmpty(String userId) {
        LocalDate currentDate = LocalDate.now();
        Integer day=currentDate.getDayOfMonth();
        Integer month=currentDate.getMonthValue();
        Integer year=currentDate.getYear();

        List<Transaction> userTransactions = transactionRepository.findByUserIdAndCreatedAt(userId, day, month, year);

        return userTransactions.isEmpty();
    }

    public Date stringToDateTime(String dateTimeStr) {
        String format = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        try {
            return sdf.parse(dateTimeStr);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<TransactionResponseDto> getAllTransactions() {
        List<Transaction> transactions = transactionRepository.findAllByUserId(userService.getAuthenticatedUser().getId());
        return transactions.stream().map(responseDtoBuilder::transactionResponseTransformer).toList();
    }
    @Override
    public TransactionDetailResponseDto getAllTransactionsWithFilter(TransactionFilterDto transactionFilterDto) {
        List<Transaction> transactions = null;
        System.out.println(transactionFilterDto);
        if(transactionFilterDto.getFilterBy().isEmpty()){
            transactions = transactionRepository.findByAllByUserIdWithQuery(transactionFilterDto.getQuery(), userService.getAuthenticatedUser().getId(),
                    this.stringToDateTime(transactionFilterDto.getStartDate()+" 00:00:00"),
                    this.stringToDateTime(transactionFilterDto.getEndDate()+" 23:59:59")
            );
        } else if(transactionFilterDto.getFilterBy().equals("category")){
            Category category = categoryRepository.findByName(transactionFilterDto.getFilter()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
            );
            transactions = transactionRepository.findByUserIdAndCategoryId(
                    transactionFilterDto.getQuery(), userService.getAuthenticatedUser().getId(), category.getId(),
                    this.stringToDateTime(transactionFilterDto.getStartDate()+" 00:00:00"),
                    this.stringToDateTime(transactionFilterDto.getEndDate()+" 23:59:59")
            );
        } else {
            Type type = typeRepository.findByName(transactionFilterDto.getFilter()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found")
            );
            transactions = transactionRepository.findByCategoryTypeId(
                    transactionFilterDto.getQuery(), userService.getAuthenticatedUser().getId(), type.getId(),
                    this.stringToDateTime(transactionFilterDto.getStartDate()+" 00:00:00"),
                    this.stringToDateTime(transactionFilterDto.getEndDate()+" 23:59:59")
            );
        }

        return responseDtoBuilder.transformToTransactionDetail(transactions);
    }


    @Override
    public Page<TransactionResponseDto> getAllTransactions(String query, Pageable pageable) {
        Page<Transaction> transactions;

        String userId = userService.getAuthenticatedUser().getId();
        if (!query.isEmpty()) {
            transactions = this.transactionRepository.findByNameIgnoreCaseContainingOrDescriptionIgnoreCaseContainingAndUserId(query, query, userId, pageable);
        } else {
            transactions = this.transactionRepository.findAllByUserId(userId, pageable);
        }

        List<TransactionResponseDto> result = transactions.stream().map(responseDtoBuilder::transactionResponseTransformer).toList();
        return new PageImpl<>(result, pageable, transactions.getTotalElements());
    }

    @Override
    public List<TransactionCategorySumDto> findTransactionCategorySum(TransactionCategorySumReqDto transactionCategorySumReqDto) {

        String userId = userService.getAuthenticatedUser().getId();
        String typeName = transactionCategorySumReqDto.getTypeName();
        Date startDate = transactionCategorySumReqDto.getStartDate();
        Date endDate = transactionCategorySumReqDto.getEndDate();

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<TransactionCategorySumDto> cq = cb.createQuery(TransactionCategorySumDto.class);

        Root<Transaction> transaction = cq.from(Transaction.class);


        Join<Transaction, Category> category = transaction.join("category");
        Join<Category, Type> type = category.join("type");


        Predicate userPredicate = cb.equal(transaction.get("user").get("id"), userId);
        Predicate datePredicate = cb.between(cb.function("DATE", Date.class, transaction.get("createdAt")), startDate, endDate);

        Predicate finalPredicate = cb.and(userPredicate, datePredicate);

        if (typeName != null && !typeName.isEmpty()) {
            Predicate typeNamePredicate = cb.equal(type.get("name"), typeName);
            finalPredicate = cb.and(finalPredicate, typeNamePredicate);
        }


        Subquery<Double> totalAmountPerTypeSubquery = cq.subquery(Double.class);
        Root<Transaction> subTransaction = totalAmountPerTypeSubquery.from(Transaction.class);
        Join<Transaction, Category> subCategory = subTransaction.join("category");
        Join<Category, Type> subType = subCategory.join("type");

        Predicate subUserPredicate = cb.equal(subTransaction.get("user").get("id"), userId);
        Predicate subDatePredicate = cb.between(cb.function("DATE", Date.class, subTransaction.get("createdAt")), startDate, endDate);

        Predicate subFinalPredicate = cb.and(subUserPredicate, subDatePredicate);

        if (typeName != null && !typeName.isEmpty()) {
            Predicate subTypeNamePredicate = cb.equal(subType.get("name"), typeName);
            subFinalPredicate = cb.and(subFinalPredicate, subTypeNamePredicate);
        }

        totalAmountPerTypeSubquery.select(cb.sum(subTransaction.get("amount"))).where(subFinalPredicate);

        Expression<Double> sumAmountCategory = cb.sum(transaction.get("amount"));
        Expression<Double> totalAmountPerType = totalAmountPerTypeSubquery.getSelection();
        Expression<Number> percentage = cb.quot(cb.prod(sumAmountCategory, 100), totalAmountPerType);

        cq.multiselect(
                transaction.get("user").get("id").alias("userId"),
                category.get("id").alias("idCategory"),
                category.get("name").alias("nameCategory"),
                category.get("color").alias("colorCategory"),
                sumAmountCategory.alias("amountTransactionCategorySum"),
                percentage.alias("percentageTransactionCategorySum")
        );

        cq.where(finalPredicate);


        cq.groupBy(transaction.get("user").get("id"), category.get("id"), category.get("name"), category.get("color"));


        TypedQuery<TransactionCategorySumDto> query = entityManager.createQuery(cq);

        return query.getResultList();
    }


    @Override
    public TransactionResponseDto getTransactionById(String id) {
        Transaction transaction = transactionRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found")
        );

        return responseDtoBuilder.transactionResponseTransformer(transaction);
    }

    @Override
    @Transactional
    public TransactionResponseDto saveTransaction(TransactionRequestDto transactionRequestDto) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );
        Category category = categoryRepository.findById(transactionRequestDto.getCategoryId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );

        //Todo saldo update
        if(category.getType().getName().equals(EType.INCOME.getValue())) {
            user.setBalance(user.getBalance() + transactionRequestDto.getAmount());
        } else {
            user.setBalance(user.getBalance() - transactionRequestDto.getAmount());
        }

        Date nowDate = new Date();
        Date createdAt = nowDate;
        if(transactionRequestDto.getCreatedAt() != null) {
            createdAt = this.stringToDateTime(transactionRequestDto.getCreatedAt());
        }

        LocalDate nowLocalDate = nowDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusHours(11).toLocalDate();
        LocalDate createdAtLocalDate = createdAt.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        boolean isSetStreak = false;
        if(this.isUserTransactionEmpty(user.getId()) && createdAtLocalDate.equals(nowLocalDate)) {
            user.setStreak(user.getStreak() + 1);
            isSetStreak = true;
        }

        if(user.getBalance() >= 0) {
            userRepository.save(user);
            if(isSetStreak) {
                rewardService.addRewardActivityToUser();
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient Balance");
        }

        //Todo save Transaction
        Transaction transaction = Transaction.builder()
                .name(transactionRequestDto.getName())
                .description(transactionRequestDto.getDescription())
                .user(user)
                .category(category)
                .amount(transactionRequestDto.getAmount())
                .createdAt(createdAt)
                .updatedAt(new Date())
                .build();
        transactionRepository.save(transaction);

        return responseDtoBuilder.transactionResponseTransformer(transaction);
    }

    @Override
    @Transactional
    public TransactionResponseDto updateTransaction(String id, TransactionRequestDto transactionRequestDto) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        Transaction transaction = transactionRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found")
        );

        Category category = categoryRepository.findById(transactionRequestDto.getCategoryId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );

        Long balance = user.getBalance();

        //Todo update saldo
        if(transaction.getCategory().getType().getName().equals(EType.INCOME.getValue())) {
            balance -= transaction.getAmount();
        } else {
            balance += transaction.getAmount();
        }

        if(category.getType().getName().equals(EType.INCOME.getValue())) {
            balance += transactionRequestDto.getAmount();
        } else {
            balance -= transactionRequestDto.getAmount();
        }
        user.setBalance(balance);

        if(user.getBalance() >= 0) {
            userRepository.save(user);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient Balance");
        }

        //Todo update Transaction
        transaction.setName(transactionRequestDto.getName());
        transaction.setDescription(transactionRequestDto.getDescription());
        transaction.setCategory(category);
        transaction.setAmount(transactionRequestDto.getAmount());
        if(transactionRequestDto.getCreatedAt() != null) {
            transaction.setCreatedAt(this.stringToDateTime(transactionRequestDto.getCreatedAt()));
        }
        transaction.setUpdatedAt(new Date());

        transactionRepository.save(transaction);

        return responseDtoBuilder.transactionResponseTransformer(transaction);
    }

    @Override
    @Transactional
    public void deleteTransaction(String id) {
        if(transactionRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).isPresent()) {

            Transaction transaction = transactionRepository.findByIdAndUserId(id, userService.getAuthenticatedUser().getId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found")
            );
            User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            //Todo update saldo
            if(transaction.getCategory().getType().getName().equals(EType.INCOME.getValue())) {
                user.setBalance(user.getBalance() - transaction.getAmount() );
            } else {
                user.setBalance(user.getBalance() + transaction.getAmount() );
            }

            transactionRepository.deleteById(id);

            if(this.isUserTransactionEmpty(user.getId())) {
                user.setStreak(user.getStreak() - 1);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaction Not Found");
        }
    }
}
