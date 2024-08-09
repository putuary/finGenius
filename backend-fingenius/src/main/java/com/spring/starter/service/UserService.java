package com.spring.starter.service;

import java.util.List;

import com.spring.starter.model.dto.req.UpdateUserRequest;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
  AppUser loadUserByUserId(String id);
  AppUser getAuthenticatedUser();
  List<UserResponseDto> getAllUsers();
  Page<UserResponseDto> getAllUsers(String query, Pageable pageable);
  UserResponseDto getUserById(String id);
  UserResponseDto getAuthUser();
  UserResponseDto UpdateUser(String id, UpdateUserRequest updateUserRequest);
  void deleteAuthUser();
  void updateStreakToZero();
}
