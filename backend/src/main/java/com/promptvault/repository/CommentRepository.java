package com.promptvault.repository;

import com.promptvault.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPromptIdOrderByCreatedAtDesc(Long promptId);
    Long countByPromptId(Long promptId);
}
