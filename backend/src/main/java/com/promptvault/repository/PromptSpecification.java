package com.promptvault.repository;

import com.promptvault.entity.Category;
import com.promptvault.entity.Prompt;
import com.promptvault.entity.Tag;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class PromptSpecification {

    public static Specification<Prompt> filterPrompts(String search, String categorySlug, String tagSlug, Boolean isPublicOnly, Long userId) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Public or Owned prompts filter
            if (isPublicOnly != null && isPublicOnly) {
                predicates.add(criteriaBuilder.equal(root.get("isPublic"), true));
            } else if (userId != null) {
                Predicate isPublic = criteriaBuilder.equal(root.get("isPublic"), true);
                Predicate isOwner = criteriaBuilder.equal(root.get("user").get("id"), userId);
                predicates.add(criteriaBuilder.or(isPublic, isOwner));
            }

            // 2. Keyword Search (title, description, or promptText)
            if (StringUtils.hasText(search)) {
                String searchLike = "%" + search.toLowerCase() + "%";
                Predicate titleLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), searchLike);
                Predicate descLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchLike);
                Predicate textLike = criteriaBuilder.like(criteriaBuilder.lower(root.get("promptText")), searchLike);
                predicates.add(criteriaBuilder.or(titleLike, descLike, textLike));
            }

            // 3. Filter by Category Slug
            if (StringUtils.hasText(categorySlug)) {
                Join<Prompt, Category> categoryJoin = root.join("category");
                predicates.add(criteriaBuilder.equal(categoryJoin.get("slug"), categorySlug));
            }

            // 4. Filter by Tag Slug
            if (StringUtils.hasText(tagSlug)) {
                Join<Prompt, Tag> tagJoin = root.join("tags");
                predicates.add(criteriaBuilder.equal(tagJoin.get("slug"), tagSlug));
            }

            query.distinct(true);
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
