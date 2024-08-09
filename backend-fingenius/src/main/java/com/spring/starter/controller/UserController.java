package com.spring.starter.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import com.spring.starter.model.dto.req.UpdateUserRequest;
import com.spring.starter.model.dto.res.CommonResponseDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.model.dto.res.ResponsePageWrapper;
import com.spring.starter.model.dto.res.UserResponseDto;
import com.spring.starter.model.entity.AppUser;
import com.spring.starter.service.impl.UserAvatarServiceImpl;
import com.spring.starter.service.UserAvatarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.spring.starter.service.UserService;
import com.spring.starter.utils.constant.ApiPathConstant;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping(
        ApiPathConstant.API +
                ApiPathConstant.VERSION +
                ApiPathConstant.USER
)
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAvatarServiceImpl userAvatarServiceImpl;

    @Autowired
    private UserAvatarService userAvatarService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<List<UserResponseDto>>> getAllUsersHandler() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<List<UserResponseDto>>(
                                HttpStatus.OK.value(),
                                "SuccessFully Retrieved Users",
                                userService.getAllUsers()
                        )
                );
    }

    @GetMapping("paginated")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponsePageWrapper<UserResponseDto>> getAllUserPage(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "limit", defaultValue = "5") int pageSize,
            @RequestParam(name = "query", defaultValue = "") String query
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ResponsePageWrapper<>(
                                HttpStatus.OK.value(),
                                "SuccessFully Retrieved Users",
                                userService.getAllUsers(query, PageRequest.of(page - 1, pageSize))
                        )
                );
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<UserResponseDto>> getUserById(
            @PathVariable String id
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<UserResponseDto>(
                                HttpStatus.OK.value(),
                                "SuccessFully Retrieved User",
                                userService.getUserById(id)
                        )
                );
    }

    @GetMapping("profile")
    public ResponseEntity<CommonResponseDto<UserResponseDto>> getUserProfile() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<UserResponseDto>(
                                HttpStatus.OK.value(),
                                "SuccessFully Retrieved User",
                                this.userService.getAuthUser()
                        )
                );
    }

    @PutMapping("profile/update")
    public ResponseEntity<CommonResponseDto<UserResponseDto>> updateUserProfile(
            @RequestBody UpdateUserRequest updateUserRequest
    ) {
        AppUser user = this.userService.getAuthenticatedUser();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<>(
                                HttpStatus.OK.value(),
                                "SuccessFully Updated User",
                                userService.UpdateUser(user.getId(), updateUserRequest)
                        )
                );
    }

    @PutMapping("{id}/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<UserResponseDto>> updateUserProfileByAdmin(
            @PathVariable String id,
            @RequestBody UpdateUserRequest updateUserRequest
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<>(
                                HttpStatus.OK.value(),
                                "SuccessFully Updated User",
                                userService.UpdateUser(id, updateUserRequest)
                        )
                );
    }

    @PutMapping("update/avatar")
    public ResponseEntity<CommonResponseDto<UserResponseDto>> updateUserAvatar(
            @RequestParam("avatar") MultipartFile avatar
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new CommonResponseDto<>(
                                HttpStatus.OK.value(),
                                "SuccessFully Updated Avatar User",
                                userAvatarService.updateAvatar(avatar)
                        )
                );
    }

    @GetMapping("avatar/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) {
        try {
            String extension = fileName.split("\\.")[1];
            MediaType mediaType = null;

            if (extension.equals("png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (extension.equals("jpg") || extension.equals("jpeg")) {
                mediaType = MediaType.IMAGE_JPEG;
            } else if (extension.equals("gif")) {
                mediaType = MediaType.IMAGE_GIF;
            } else if (extension.equals("pdf")) {
                mediaType = MediaType.APPLICATION_PDF;
            } else {
                mediaType = MediaType.APPLICATION_OCTET_STREAM;
            }

            Path path = Paths.get(userAvatarServiceImpl.getFileStorageLocation() + fileName);
            byte[] file = Files.readAllBytes(path);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .contentType(mediaType)
                    .body(file);
        } catch (Exception e) {
            throw new RuntimeException("File not found");
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseMessageDto> deleteAuthUser() {
        this.userService.deleteAuthUser();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(
                        new ResponseMessageDto(
                                HttpStatus.OK.value(),
                                "Successfully deleted user",
                                new Date()
                        )
                );
    }

}
