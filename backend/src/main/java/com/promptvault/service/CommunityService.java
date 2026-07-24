package com.promptvault.service;

import com.promptvault.dto.CommentRequest;
import com.promptvault.dto.CommentResponse;
import com.promptvault.dto.RatingRequest;
import com.promptvault.dto.RatingSummaryResponse;

import java.util.List;

public interface CommunityService {
    RatingSummaryResponse ratePrompt(Long promptId, RatingRequest ratingRequest, String username);
    RatingSummaryResponse getRatingSummary(Long promptId, String username);
    CommentResponse addComment(Long promptId, CommentRequest commentRequest, String username);
    List<CommentResponse> getCommentsForPrompt(Long promptId);
    void deleteComment(Long commentId, String username);
    Integer toggleLike(Long promptId);
}
