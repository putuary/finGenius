package com.spring.starter.controller;

import com.spring.starter.model.dto.req.BalancePushRequestDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.model.dto.req.BalanceRequestDto;
import com.spring.starter.service.BalanceService;
import com.spring.starter.utils.constant.ApiPathConstant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(
        ApiPathConstant.API +
        ApiPathConstant.VERSION +
        ApiPathConstant.BALANCE
)
@Validated
public class BalanceController {

    private final BalanceService balanceService;

    @PutMapping("push")
    public ResponseEntity<ResponseMessageDto> pushBalance(@Validated @RequestBody BalancePushRequestDto balancePushRequestDto) {
        balanceService.pushBalance(balancePushRequestDto);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(
                        HttpStatus.OK.value(),
                        "SuccessFully Push Balance from " + balancePushRequestDto.getFrom() + " to " + balancePushRequestDto.getTo(),
                        new Date()));
    }

    @PutMapping("saving")
    public ResponseEntity<ResponseMessageDto> updateBalanceSaving(@Validated @RequestBody BalanceRequestDto balanceRequestDto) {
        balanceService.updateBalanceSaving(balanceRequestDto.getBalance());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(
                        HttpStatus.OK.value(),
                        "SuccessFully Updated Balance",
                        new Date()));
    }

    @PutMapping("asset")
    public ResponseEntity<ResponseMessageDto> updateBalanceAsset(@Validated @RequestBody BalanceRequestDto balanceRequestDto) {
        balanceService.updateBalanceAsset(balanceRequestDto.getBalance());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(
                        HttpStatus.OK.value(),
                        "SuccessFully Updated Balance",
                        new Date()));
    }

}
