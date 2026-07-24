package com.promptvault.service.impl;

import com.promptvault.dto.CommentRequest;
import com.promptvault.dto.CommentResponse;
import com.promptvault.dto.RatingRequest;
import com.promptvault.dto.RatingSummaryResponse;
import com.promptvault.entity.Comment;
import com.promptvault.entity.Prompt;
import com.promptvault.entity.PromptRating;
import com.promptvault.entity.User;
import com.promptvault.exception.BadRequestException;
import com.promptvault.exception.ResourceNotFoundException;
import com.promptvault.mapper.CommentMapper;
import com.promptvault.repository.CommentRepository;
import com.promptvault.repository.PromptRatingRepository;
import com.promptvault.repository.PromptRepository;
import com.promptvault.repository.UserRepository;
import com.promptvault.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityServiceImpl implements CommunityService {

    @Autowired
    private PromptRepository promptRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromptRatingRepository ratingRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

    @Override
    @Transactional
    public RatingSummaryResponse ratePrompt(Long promptId, RatingRequest ratingRequest, String username) {
        Prompt prompt = promptRepository.findById(promptId)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", promptId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Optional<PromptRating> existingRating = ratingRepository.findByPromptIdAndUserId(promptId, user.getId());

        if (existingRating.isPresent()) {
            PromptRating rating = existingRating.get();
            rating.setStars(ratingRequest.getStars());
            ratingRepository.save(rating);
        } else {
            PromptRating rating = PromptRating.builder()
                    .prompt(prompt)
                    .user(user)
                    .stars(ratingRequest.getStars())
                    .build();
            ratingRepository.save(rating);
        }

        return getRatingSummary(promptId, username);
    }

    @Override
    @Transactional(readOnly = true)
    public RatingSummaryResponse getRatingSummary(Long promptId, String username) {
        Double avg = ratingRepository.getAverageRatingForPrompt(promptId);
        Long total = ratingRepository.countByPromptId(promptId);
        
        Integer userRating = null;
        if (username != null) {
            userRepository.findByUsername(username).ifPresent(u -> {
                ratingRepository.findByPromptIdAndUserId(promptId, u.getId())
                        .ifPresent(r -> {
                            // Captured via local scope variable
                        });
            });
            User u = userRepository.findByUsername(username).orElse(null);
            if (u != null) {
                Optional<PromptRating> pr = ratingRepository.findByPromptIdAndUserId(promptId, u.getId());
                if (pr.isPresent()) {
                    userRating = pr.get().getStars();
                }
            }
        }

        return RatingSummaryResponse.builder()
                .averageRating(avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0)
                .totalRatings(total)
                .userRating(userRating)
                .build();
    }

    @Override
    @Transactional
    public CommentResponse addComment(Long promptId, CommentRequest commentRequest, String username) {
        Prompt prompt = promptRepository.findById(promptId)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", promptId));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Comment comment = Comment.builder()
                .prompt(prompt)
                .user(user)
                .content(commentRequest.getContent())
                .build();

        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toCommentResponse(savedComment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentsForPrompt(Long promptId) {
        return commentRepository.findByPromptIdOrderByCreatedAtDesc(promptId).stream()
                .map(commentMapper::toCommentResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId, String username) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment", "id", commentId));

        if (!comment.getUser().getUsername().equals(username)) {
            throw new BadRequestException("You are not authorized to delete this comment!");
        }

        commentRepository.delete(comment);
    }

    @Override
    @Transactional
    public Integer toggleLike(Long promptId) {
        Prompt prompt = promptRepository.findById(promptId)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", promptId));

        prompt.setLikeCount(prompt.getLikeCount() + 1);
        Prompt saved = promptRepository.save(prompt);
        return saved.getLikeCount();
    }
}
