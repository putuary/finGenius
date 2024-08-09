package com.spring.starter.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.spring.starter.model.dto.req.UpdateUserRequest;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.AppUser;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.utils.constant.ERole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.spring.starter.service.ResponseDtoBuilder;
import com.spring.starter.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ResponseDtoBuilder responseDtoBuilder;

  @Autowired
  private PasswordEncoder passwordEncoder;
  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = this.userRepository.findByEmail(username).orElseThrow(
      () -> new UsernameNotFoundException("Invalid Credentials")
    );

    return this.responseDtoBuilder.appUserTransformer(user);
  }

  @Override
  public AppUser loadUserByUserId(String id) {
    User user = this.userRepository.findById(id).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    );

    return this.responseDtoBuilder.appUserTransformer(user);
  }

  @Override
  public AppUser getAuthenticatedUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    return (AppUser) authentication.getPrincipal();
  }

  @Override
  public List<UserResponseDto> getAllUsers() {
    List<User> users = this.userRepository.findAllByRole(ERole.USER);
    List<UserResponseDto> result = users.stream().map(this.responseDtoBuilder::userResponseTransformer).collect(Collectors.toList());
    return result;
  }

  @Override
  public Page<UserResponseDto> getAllUsers(String query, Pageable pageable) {
    Page<User> users;

    if (!query.isEmpty()) {
      users = this.userRepository.findByFullnameIgnoreCaseContainingOrEmailIgnoreCaseContainingAndRoleIgnoreCaseContaining(query, query, ERole.USER, pageable);
    } else {
      users = this.userRepository.findAllByRole(ERole.USER, pageable);
    }

    List<UserResponseDto> userResponseDtos = users.getContent().stream().map(this.responseDtoBuilder::userResponseTransformer).collect(Collectors.toList());
    return new PageImpl<>(userResponseDtos, pageable, users.getTotalElements());
  }

  @Override
  public UserResponseDto getUserById(String id) {
    User user = this.userRepository.findById(id).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
    );

    return this.responseDtoBuilder.userResponseTransformer(user);
  }

  @Override
  public UserResponseDto getAuthUser() {
    return this.getUserById(this.getAuthenticatedUser().getId());
  }

  @Override
  public UserResponseDto UpdateUser(String id, UpdateUserRequest updateUserRequest) {
    User user = this.userRepository.findById(id).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
    );

    user.setEmail(updateUserRequest.getEmail());
    user.setPassword(this.passwordEncoder.encode(updateUserRequest.getPassword()));
    user.setFullname(updateUserRequest.getFullname());
    this.userRepository.save(user);
    
    return this.responseDtoBuilder.userResponseTransformer(user);
  }

  @Override
  public void deleteAuthUser() {
    User user = this.userRepository.findById(this.getAuthenticatedUser().getId()).orElseThrow(
      () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
    );
    
    this.userRepository.delete(user);
  }

  @Override
  public void updateStreakToZero() {
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.DATE, -1);
    cal.set(Calendar.HOUR_OF_DAY, 0);
    cal.set(Calendar.MINUTE, 0);
    cal.set(Calendar.SECOND, 0);
    cal.set(Calendar.MILLISECOND, 0);
    Date startOfYesterday = cal.getTime();

    cal.set(Calendar.HOUR_OF_DAY, 23);
    cal.set(Calendar.MINUTE, 59);
    cal.set(Calendar.SECOND, 59);
    cal.set(Calendar.MILLISECOND, 999);
    Date endOfYesterday = cal.getTime();

    userRepository.resetStreakForUsersWithoutTransactionsYesterday(startOfYesterday, endOfYesterday);
  }
}
