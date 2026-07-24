package com.promptvault.controller;

import com.promptvault.dto.ApiResponse;
import com.promptvault.dto.PagedResponse;
import com.promptvault.dto.PromptRequest;
import com.promptvault.dto.PromptResponse;
import com.promptvault.service.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/prompts")
public class PromptController {

    @Autowired
    private PromptService promptService;

    @PostMapping
    public ResponseEntity<ApiResponse<PromptResponse>> createPrompt(
            @Valid @RequestBody PromptRequest promptRequest,
            Authentication authentication) {
        PromptResponse response = promptService.createPrompt(promptRequest, authentication.getName());
        return new ResponseEntity<>(ApiResponse.success("Prompt created successfully!", response), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<PromptResponse>>> searchPrompts(
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "category", required = false) String categorySlug,
            @RequestParam(value = "tag", required = false) String tagSlug,
            @RequestParam(value = "aiTool", required = false) String aiTool,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "sortBy", defaultValue = "createdAt") String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            Authentication authentication) {
        
        String username = authentication != null ? authentication.getName() : null;
        PagedResponse<PromptResponse> response = promptService.searchPrompts(
                search, categorySlug, tagSlug, aiTool, page, size, sortBy, sortDir, username);
        
        return ResponseEntity.ok(ApiResponse.success("Prompts retrieved successfully!", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PromptResponse>> getPromptById(@PathVariable Long id) {
        PromptResponse response = promptService.getPromptById(id);
        return ResponseEntity.ok(ApiResponse.success("Prompt retrieved successfully!", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PromptResponse>> updatePrompt(
            @PathVariable Long id,
            @Valid @RequestBody PromptRequest promptRequest,
            Authentication authentication) {
        PromptResponse response = promptService.updatePrompt(id, promptRequest, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Prompt updated successfully!", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePrompt(
            @PathVariable Long id,
            Authentication authentication) {
        promptService.deletePrompt(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Prompt deleted successfully!"));
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<ApiResponse<PromptResponse>> toggleFavorite(@PathVariable Long id) {
        PromptResponse response = promptService.toggleFavorite(id);
        return ResponseEntity.ok(ApiResponse.success("Favorite status updated!", response));
    }
}
