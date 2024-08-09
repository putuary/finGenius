package com.spring.starter.controller;

import com.spring.starter.model.dto.res.CommonResponseDto;
import com.spring.starter.model.dto.res.ResponseBudgetingDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.model.dto.req.BudgetingDto;
import com.spring.starter.model.entity.Budgeting;
import com.spring.starter.service.BudgetingService;
import com.spring.starter.utils.constant.ApiPathConstant;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(
        ApiPathConstant.API +
                ApiPathConstant.VERSION +
                ApiPathConstant.BGT
)
@Validated
@RequiredArgsConstructor
public class BudgetController {
    private final BudgetingService budgetingService;

    @GetMapping
    public ResponseEntity<CommonResponseDto<List<ResponseBudgetingDto>>> getAllBudgetByUser(){
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                "SuccessFully Retrieved Budget",
                budgetingService.getBudgetingAuthUser()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponseDto<ResponseBudgetingDto>> getBudgetById(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Budget",
                        budgetingService.getBudgetingAuthUserById(id)));
    }

    @PostMapping
    public ResponseEntity<CommonResponseDto<ResponseBudgetingDto>> saveBudgeting(
            @Valid
            @RequestBody BudgetingDto budgetingDto
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CommonResponseDto<>(HttpStatus.CREATED.value(),
                        "SuccessFully Created Budget",
                        budgetingService.saveBudgeting(budgetingDto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommonResponseDto<ResponseBudgetingDto>> updateAmountBudgeting(
            @PathVariable String id,
            @Valid
            @RequestBody BudgetingDto budgetingDto
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Updated Budget",
                        budgetingService.updateAmountBudgeting(id, budgetingDto)));
    }

    @PutMapping("active/{id}")
    public ResponseEntity<CommonResponseDto<ResponseBudgetingDto>> updateActiveBudgeting(
            @PathVariable String id
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Updated Budget",
                        budgetingService.updateActiveBudgeting(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> deleteBudgeting(@PathVariable String id) {
        budgetingService.deleteBudgeting(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(HttpStatus.OK.value(),
                        "SuccessFully Deleted Budget",
                        new Date()));
    }

}
