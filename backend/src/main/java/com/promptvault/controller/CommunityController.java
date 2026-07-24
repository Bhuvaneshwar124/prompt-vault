package com.promptvault.controller;

import com.promptvault.dto.*;
import com.promptvault.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @PostMapping("/prompts/{id}/ratings")
    public ResponseEntity<ApiResponse<RatingSummaryResponse>> ratePrompt(
            @PathVariable Long id,
            @Valid @RequestBody RatingRequest ratingRequest,
            Authentication authentication) {
        RatingSummaryResponse response = communityService.ratePrompt(id, ratingRequest, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Rating submitted successfully!", response));
    }

    @GetMapping("/prompts/{id}/ratings")
    public ResponseEntity<ApiResponse<RatingSummaryResponse>> getRatingSummary(
            @PathVariable Long id,
            Authentication authentication) {
        String username = authentication != null ? authentication.getName() : null;
        RatingSummaryResponse response = communityService.getRatingSummary(id, username);
        return ResponseEntity.ok(ApiResponse.success("Rating summary retrieved!", response));
    }

    @PostMapping("/prompts/{id}/comments")
    public ResponseEntity<ApiResponse<CommentResponse>> addComment(
            @PathVariable Long id,
            @Valid @RequestBody CommentRequest commentRequest,
            Authentication authentication) {
        CommentResponse response = communityService.addComment(id, commentRequest, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Comment added successfully!", response), HttpStatus.CREATED);
    }

    @GetMapping("/prompts/{id}/comments")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getCommentsForPrompt(@PathVariable Long id) {
        List<CommentResponse> comments = communityService.getCommentsForPrompt(id);
        return ResponseEntity.ok(ApiResponse.success("Comments retrieved successfully!", comments));
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable Long id,
            Authentication authentication) {
        communityService.deleteComment(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Comment deleted successfully!"));
    }

    @PostMapping("/prompts/{id}/like")
    public ResponseEntity<ApiResponse<Integer>> toggleLike(@PathVariable Long id) {
        Integer newLikeCount = communityService.toggleLike(id);
        return ResponseEntity.ok(ApiResponse.success("Like updated!", newLikeCount));
    }
}
