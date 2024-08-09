package com.spring.starter.service.impl;

import com.spring.starter.repository.CategoryRepository;
import com.spring.starter.repository.TypeRepository;
import com.spring.starter.service.CategoryService;
import com.spring.starter.model.dto.req.CategoryDto;
import com.spring.starter.model.entity.Category;
import com.spring.starter.model.entity.Type;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final TypeRepository typeRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );
    }

    @Override
    public Category saveCategory(CategoryDto categoryDto) {
        Type type = typeRepository.findById(categoryDto.getTypeId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found")
        );

        Category category = Category.builder()
                .name(categoryDto.getName())
                .icon(categoryDto.getIcon())
                .color(categoryDto.getColor())
                .type(type)
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();

        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(String id, CategoryDto categorydDto) {
        Category categoryExist = categoryRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found")
        );
        Type type = typeRepository.findById(categorydDto.getTypeId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found")
        );

        Category updatedCategory = Category.builder()
                .id(id)
                .name(categorydDto.getName())
                .icon(categorydDto.getIcon())
                .color(categorydDto.getColor())
                .type(type)
                .createdAt(categoryExist.getCreatedAt())
                .updatedAt(new Date())
                .build();

        return categoryRepository.save(updatedCategory);
    }

    @Override
    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }
}
