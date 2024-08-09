package com.spring.starter.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.User;
import com.spring.starter.repository.UserRepository;
import com.spring.starter.service.ResponseDtoBuilder;
import com.spring.starter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.starter.config.FileStorageProperties;
import com.spring.starter.service.UserAvatarService;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserAvatarServiceImpl implements UserAvatarService {

  private final Path fileStorageLocation;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private UserService userService;

  @Autowired
  private ResponseDtoBuilder responseDtoBuilder;

  public UserAvatarServiceImpl(FileStorageProperties fileStorageProperties) {
    this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadAvatarDir())
    .toAbsolutePath()
    .normalize();

    try {
      Files.createDirectories(this.fileStorageLocation);
    } catch (Exception e) {
        throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", e);
    }
  }

  public String getFileStorageLocation() {
    return fileStorageLocation.toString()+"/";
  }

  @Override
  public UserResponseDto updateAvatar(MultipartFile file) {
    User user = this.userRepository.findById(userService.getAuthenticatedUser().getId()).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
    );

    if(user.getAvatar() != null) {
      try {
        Files.deleteIfExists(this.fileStorageLocation.resolve(user.getAvatar()));
      } catch (IOException e) {
        throw new RuntimeException("Could not store the file. Please try again!", e);
      }
    }

    String fileName = file.getOriginalFilename();
    String[] splitName = fileName.split("\\.");

    fileName =  "Avatar_" + user.getId() + "." + splitName[splitName.length - 1];

    Path targetLocation = this.fileStorageLocation.resolve(fileName);
    System.out.println(targetLocation);

    try {
      Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
      user.setAvatar(fileName);
      this.userRepository.save(user);
      return this.responseDtoBuilder.userResponseTransformer(user);
    } catch (IOException e) {
      throw new RuntimeException("Could not store the file. Please try again!", e);
    }
  }
  
}
