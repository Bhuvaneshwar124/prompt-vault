package com.promptvault.repository;

import com.promptvault.entity.Prompt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromptRepository extends JpaRepository<Prompt, Long>, JpaSpecificationExecutor<Prompt> {
    Page<Prompt> findByUserId(Long userId, Pageable pageable);
    Page<Prompt> findByIsPublicTrue(Pageable pageable);
    List<Prompt> findByCategoryId(Long categoryId);
}
