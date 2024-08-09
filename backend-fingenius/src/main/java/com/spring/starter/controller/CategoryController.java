package com.spring.starter.controller;


import com.spring.starter.model.dto.res.CommonResponseDto;
import com.spring.starter.model.dto.res.ResponseMessageDto;
import com.spring.starter.model.dto.req.CategoryDto;
import com.spring.starter.model.entity.Category;
import com.spring.starter.service.CategoryService;
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
        ApiPathConstant.CATEGORY
)
@Validated
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<CommonResponseDto<List<Category>>> getAllCategories() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Categories",
                        categoryService.getAllCategories()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponseDto<Category>> getCategoryById(@PathVariable String id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Retrieved Category",
                        categoryService.getCategoryById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<Category>> saveCategory(
            @Valid
            @RequestBody CategoryDto categoryDto) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new CommonResponseDto<>(HttpStatus.CREATED.value(),
                        "SuccessFully Created Category",
                        categoryService.saveCategory(categoryDto)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CommonResponseDto<Category>> updateCategory(@PathVariable String id,
                                                                      @Valid
                                                                      @RequestBody CategoryDto categoryDto) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new CommonResponseDto<>(HttpStatus.OK.value(),
                        "SuccessFully Updated Category",
                        categoryService.updateCategory(id, categoryDto)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessageDto> deleteCategory(@PathVariable String id) {

        categoryService.deleteCategory(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseMessageDto(HttpStatus.OK.value(),
                        "SuccessFully Deleted Category",
                        new Date()));
    }


}
