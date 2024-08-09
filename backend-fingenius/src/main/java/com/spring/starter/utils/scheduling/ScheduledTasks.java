package com.spring.starter.utils.scheduling;

import com.spring.starter.service.AuthService;
import com.spring.starter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final AuthService authService;
    private final UserService userService;

    @Scheduled(cron = "0 0/30 * * * ?")
    public void scheduleResetPasswordTokenExpired() {
        authService.deletePasswordResetTokenExpired();
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void schedulResetStreakToZero() {
        userService.updateStreakToZero();
    }
}

