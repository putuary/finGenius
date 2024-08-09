package com.spring.starter.service;

import com.spring.starter.model.dto.res.UserResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserAvatarService {
  UserResponseDto updateAvatar(MultipartFile file);
}
