package com.promptvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PromptResponse {

    private Long id;
    private String title;
    private String description;
    private String promptText;
    private String systemInstruction;
    private String targetModel;
    private Boolean isPublic;
    private Boolean isFavorite;
    private Integer viewCount;
    private Integer likeCount;
    
    private CategoryResponse category;
    private Set<TagResponse> tags;
    private UserResponse author;
    
    // Extracted dynamic template variables (e.g. ['language', 'framework'])
    private List<String> extractedVariables;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
