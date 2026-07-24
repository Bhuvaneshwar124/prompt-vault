package com.promptvault.service.impl;

import com.promptvault.dto.CategoryRequest;
import com.promptvault.dto.CategoryResponse;
import com.promptvault.entity.Category;
import com.promptvault.exception.BadRequestException;
import com.promptvault.exception.ResourceNotFoundException;
import com.promptvault.mapper.CategoryMapper;
import com.promptvault.repository.CategoryRepository;
import com.promptvault.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        if (categoryRepository.existsByName(categoryRequest.getName())) {
            throw new BadRequestException("Category with name '" + categoryRequest.getName() + "' already exists!");
        }

        String slug = generateSlug(categoryRequest.getName());
        if (categoryRepository.existsBySlug(slug)) {
            throw new BadRequestException("Category slug '" + slug + "' already exists!");
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .slug(slug)
                .description(categoryRequest.getDescription())
                .colorCode(categoryRequest.getColorCode() != null ? categoryRequest.getColorCode() : "#6366f1")
                .build();

        Category savedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toCategoryResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "slug", slug));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest categoryRequest) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

        if (!category.getName().equalsIgnoreCase(categoryRequest.getName()) 
                && categoryRepository.existsByName(categoryRequest.getName())) {
            throw new BadRequestException("Category name '" + categoryRequest.getName() + "' is already taken!");
        }

        category.setName(categoryRequest.getName());
        category.setSlug(generateSlug(categoryRequest.getName()));
        category.setDescription(categoryRequest.getDescription());
        if (categoryRequest.getColorCode() != null) {
            category.setColorCode(categoryRequest.getColorCode());
        }

        Category updatedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(updatedCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        categoryRepository.delete(category);
    }

    private String generateSlug(String text) {
        return text.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s-]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
