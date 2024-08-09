package com.spring.starter.service.impl;

import com.spring.starter.model.dto.req.BalancePushRequestDto;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.service.BalanceService;
import com.spring.starter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class BalanceServiceImpl implements BalanceService {

    private final UserRepository userRepository;
    private final UserService userService;


    private User pushBalanceToSaving(User user, Long amount) {

        if(amount > user.getBalance()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Balance is not enough");
        }

        user.setBalance(user.getBalance() - amount);
        user.setBalanceSaving(user.getBalanceSaving() + amount);
        user.setUpdatedAt(new Date());

        return user;
    }

    private User pushBalanceToAsset(User user, Long amount) {
        if(amount > user.getBalance()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Balance is not enough");
        }

        user.setBalance(user.getBalance() - amount);
        user.setBalanceAsset(user.getBalanceAsset() + amount);
        user.setUpdatedAt(new Date());

        return user;
    }

    private User pushSavingToBalance(User user , Long amount) {
        if(amount > user.getBalanceSaving()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Balance Saving is not enough");
        }

        user.setBalanceSaving(user.getBalanceSaving() - amount);
        user.setBalance(user.getBalance() + amount);
        user.setUpdatedAt(new Date());

        return user;
    }

    private User pushAssetToBalance(User user, Long amount) {

        if(amount > user.getBalanceAsset()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Balance Asset is not enough");
        }

        user.setBalanceAsset(user.getBalanceAsset() - amount);
        user.setBalance(user.getBalance() + amount);
        user.setUpdatedAt(new Date());

        return user;
    }

    @Override
    public void pushBalance(BalancePushRequestDto balancePushRequestDto) {
        String from = balancePushRequestDto.getFrom();
        String to = balancePushRequestDto.getTo();
        Long amount = balancePushRequestDto.getAmount();

        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        if(from.equals("balance") && to.equals("saving")) {
            this.pushBalanceToSaving(user, amount);
        } else if(from.equals("balance") && to.equals("asset")) {
            this.pushBalanceToAsset(user, amount);
        } else if(from.equals("saving") && to.equals("balance")) {
            this.pushSavingToBalance(user, amount);
        } else if(from.equals("asset") && to.equals("balance")) {
            this.pushAssetToBalance(user, amount);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Request");
        }
        userRepository.save(user);
    }

    @Override
    public void updateBalanceSaving(Long amount) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        user.setUpdatedAt(new Date());
        user.setBalanceSaving(amount);

        userRepository.save(user);
    }

    @Override
    public void updateBalanceAsset(Long amount) {
        User user = userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
        );

        user.setUpdatedAt(new Date());
        user.setBalanceAsset(amount);
        userRepository.save(user);
    }
}
