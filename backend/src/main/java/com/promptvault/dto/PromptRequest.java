package com.promptvault.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromptRequest {

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 3, max = 150, message = "Title must be between 3 and 150 characters")
    private String title;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Prompt text cannot be blank")
    private String promptText;

    private String systemInstruction;

    @NotBlank(message = "Target model is required")
    private String targetModel;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private Set<Long> tagIds;

    private Boolean isPublic = true;
}
