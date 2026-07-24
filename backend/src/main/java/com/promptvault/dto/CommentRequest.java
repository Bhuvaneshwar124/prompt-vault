package com.promptvault.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {

    @NotBlank(message = "Comment text cannot be blank")
    @Size(max = 1000, message = "Comment cannot exceed 1000 characters")
    private String content;
}
