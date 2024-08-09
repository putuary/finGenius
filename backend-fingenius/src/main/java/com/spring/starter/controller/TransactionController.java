package com.spring.starter.controller;

import com.spring.starter.model.dto.req.TransactionCategorySumReqDto;
import com.spring.starter.model.dto.req.TransactionFilterDto;
import com.spring.starter.model.dto.req.TransactionRequestDto;
import com.spring.starter.model.dto.res.*;
import com.spring.starter.model.entity.User;
import com.spring.starter.service.TransactionService;
import com.spring.starter.utils.constant.ApiPathConstant;
import com.spring.starter.utils.constant.EType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(
        ApiPathConstant.API +
        ApiPathConstant.VERSION +
        ApiPathConstant.TRANSACTION
)
@Validated
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<CommonResponseDto<List<TransactionResponseDto>>> getAllTransactions() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Transactions",
                        transactionService.getAllTransactions()));
    }

    @GetMapping("filter")
    public ResponseEntity<CommonResponseDto<TransactionDetailResponseDto>> getAllTransactionsWithFilter(@RequestParam(name="query", defaultValue = "") String query,
                                                                                                        @RequestParam(name="filterBy", defaultValue = "") String filterBy,
                                                                                                        @RequestParam(name="filter", defaultValue = "") String filter,
                                                                                                        @RequestParam(name="startDate", defaultValue = "") String startDate,
                                                                                                        @RequestParam(name="endDate", defaultValue = "") String endDate) {
        TransactionFilterDto dataFilter = TransactionFilterDto.builder()
                .query(query)
                .filterBy(filterBy)
                .filter(filter)
                .startDate(startDate)
                .endDate(endDate)
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Transactions",
                        transactionService.getAllTransactionsWithFilter(dataFilter)));
    }

    @GetMapping("/category-sum")
    public ResponseEntity<CommonResponseDto<List<TransactionCategorySumDto>>> getTransactionCategorySum(
            @RequestParam(name = "Type", required = false) String type,
            @RequestParam(name = "startDate", required = false) String startDate,
            @RequestParam(name = "endDate", required = false) String endDate
    ) {
        TransactionCategorySumReqDto transactionCategorySumReqDto = new TransactionCategorySumReqDto();
        transactionCategorySumReqDto.setTypeName(type);
        Date start = Date.from(LocalDate.parse(startDate).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end = Date.from(LocalDate.parse(endDate).atStartOfDay(ZoneId.systemDefault()).toInstant());
        transactionCategorySumReqDto.setStartDate(start);
        transactionCategorySumReqDto.setEndDate(end);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Transactions",
                        transactionService.findTransactionCategorySum(transactionCategorySumReqDto)));
    }


    @GetMapping("paginated")
    public ResponseEntity<ResponsePageWrapper<TransactionResponseDto>> getAllTransactionsPaginated(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "5") int pageSize,
            @RequestParam(name = "query", defaultValue = "") String query
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponsePageWrapper<>(
                        HttpStatus.OK.value(),
                        "SuccessFully Retrieved Transactions",
                        transactionService.getAllTransactions(query, PageRequest.of(page - 1, pageSize))
                        )
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponseDto<TransactionResponseDto>> getTransactionById(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Transaction",
                        transactionService.getTransactionById(id)));
    }

    @PostMapping
    public ResponseEntity<CommonResponseDto<TransactionResponseDto>> saveTransaction(
            @Valid
            @RequestBody TransactionRequestDto transactionRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CommonResponseDto<>(HttpStatus.CREATED.value(),
                        "SuccessFully Created Transaction",
                        transactionService.saveTransaction(transactionRequestDto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommonResponseDto<TransactionResponseDto>> updateTransaction(
            @PathVariable String id,
            @Valid
            @RequestBody TransactionRequestDto transactionRequestDto
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Updated Transaction",
                        transactionService.updateTransaction(id, transactionRequestDto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(HttpStatus.OK.value(),
                        "SuccessFully Deleted Transaction",
                        new Date()));
    }
}
