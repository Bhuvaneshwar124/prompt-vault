package com.promptvault.mapper;

import com.promptvault.dto.CategoryResponse;
import com.promptvault.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toCategoryResponse(Category category) {
        if (category == null) {
            return null;
        }

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .colorCode(category.getColorCode())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
