package com.spring.starter.controller;

import com.spring.starter.model.dto.res.CommonResponseDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.model.dto.req.RewardDto;
import com.spring.starter.model.entity.RewardActivity;
import com.spring.starter.service.RewardService;
import com.spring.starter.utils.constant.ApiPathConstant;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(
        ApiPathConstant.API +
                ApiPathConstant.VERSION +
                ApiPathConstant.RWD
)
@Validated
public class RewardController {
    @Autowired
    RewardService rewardService;

    @GetMapping
    public ResponseEntity<CommonResponseDto<List<RewardActivity>>> getAllReward() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<>(
                                HttpStatus.OK.value(),
                                "SuccessFully Retrieved Rewards",
                                rewardService.getAllRewardActivity()
                        )
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponseDto<RewardActivity>> getRewardById(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(), "SuccessFully Retrieved Reward",
                        rewardService.getRewardActivityById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<RewardActivity>> saveReward(@Valid @RequestBody RewardDto reward) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CommonResponseDto<>(HttpStatus.CREATED.value(),
                        "SuccessFully Created Reward",
                        rewardService.saveRewardActivity(reward)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<RewardActivity>> updateReward(@PathVariable String id, @Valid @RequestBody RewardDto reward) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Updated Reward",
                        rewardService.updateRewardActivity(id, reward)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessageDto> deleteReward(@PathVariable String id) {
        rewardService.deleteRewardActivity(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(HttpStatus.OK.value(),
                        "SuccessFully Deleted Reward",
                        new Date()));
    }




}
