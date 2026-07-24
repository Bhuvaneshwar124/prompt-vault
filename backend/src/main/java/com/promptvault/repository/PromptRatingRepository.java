package com.promptvault.repository;

import com.promptvault.entity.PromptRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromptRatingRepository extends JpaRepository<PromptRating, Long> {
    Optional<PromptRating> findByPromptIdAndUserId(Long promptId, Long userId);
    
    @Query("SELECT AVG(pr.stars) FROM PromptRating pr WHERE pr.prompt.id = :promptId")
    Double getAverageRatingForPrompt(@Param("promptId") Long promptId);
    
    Long countByPromptId(Long promptId);
}
