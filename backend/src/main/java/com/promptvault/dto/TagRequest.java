package com.promptvault.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagRequest {

    @NotBlank(message = "Tag name cannot be blank")
    @Size(min = 2, max = 30, message = "Tag name must be between 2 and 30 characters")
    private String name;
}
