package com.promptvault.service;

import com.promptvault.dto.PagedResponse;
import com.promptvault.dto.PromptRequest;
import com.promptvault.dto.PromptResponse;

public interface PromptService {
    PromptResponse createPrompt(PromptRequest promptRequest, String username);
    PagedResponse<PromptResponse> searchPrompts(String search, String categorySlug, String tagSlug, int page, int size, String sortBy, String sortDir, String currentUsername);
    PromptResponse getPromptById(Long id);
    PromptResponse updatePrompt(Long id, PromptRequest promptRequest, String username);
    void deletePrompt(Long id, String username);
    PromptResponse toggleFavorite(Long id);
}
