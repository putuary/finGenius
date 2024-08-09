package com.spring.starter.service;

import com.spring.starter.model.dto.req.CategoryDto;
import com.spring.starter.model.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {

    List<Category> getAllCategories();
    Category getCategoryById(String id);
    Category saveCategory(CategoryDto categoryDto);
    Category updateCategory(String id, CategoryDto categoryDto);
    void deleteCategory(String id);
}
