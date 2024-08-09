package com.spring.starter.controller;


import com.spring.starter.model.dto.res.CommonResponseDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.service.TypeService;
import com.spring.starter.model.dto.req.TypeDto;
import com.spring.starter.model.entity.Type;
import com.spring.starter.utils.constant.ApiPathConstant;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
        ApiPathConstant.TYPE
)
@Validated
public class TypeController {
    private final TypeService typeService;

    @GetMapping
    public ResponseEntity<CommonResponseDto<List<Type>>> getAllTypes() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Types",
                        typeService.getAllTypes()));
    }

    @GetMapping("{id}")
    public ResponseEntity<CommonResponseDto<Type>> getTypeById(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Types",
                        typeService.getTypeById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<Type>> saveType(
            @Valid
            @RequestBody TypeDto typeDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CommonResponseDto<>(HttpStatus.CREATED.value(),
                        "SuccessFully Created Type",
                        typeService.saveType(typeDto)));
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessageDto> deleteType(@PathVariable String id) {
        typeService.deleteType(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(HttpStatus.OK.value(),
                        "SuccessFully Deleted Type",
                        new Date()));
    }
}
