package com.promptvault.service.impl;

import com.promptvault.dto.PagedResponse;
import com.promptvault.dto.PromptRequest;
import com.promptvault.dto.PromptResponse;
import com.promptvault.entity.Category;
import com.promptvault.entity.Prompt;
import com.promptvault.entity.Tag;
import com.promptvault.entity.User;
import com.promptvault.exception.BadRequestException;
import com.promptvault.exception.ResourceNotFoundException;
import com.promptvault.mapper.PromptMapper;
import com.promptvault.repository.CategoryRepository;
import com.promptvault.repository.PromptRepository;
import com.promptvault.repository.PromptSpecification;
import com.promptvault.repository.TagRepository;
import com.promptvault.repository.UserRepository;
import com.promptvault.service.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PromptServiceImpl implements PromptService {

    @Autowired
    private PromptRepository promptRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private PromptMapper promptMapper;

    @Override
    @Transactional
    public PromptResponse createPrompt(PromptRequest promptRequest, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Category category = categoryRepository.findById(promptRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", promptRequest.getCategoryId()));

        Set<Tag> tags = new HashSet<>();
        if (promptRequest.getTagIds() != null && !promptRequest.getTagIds().isEmpty()) {
            tags.addAll(tagRepository.findAllById(promptRequest.getTagIds()));
        }

        Prompt prompt = Prompt.builder()
                .title(promptRequest.getTitle())
                .description(promptRequest.getDescription())
                .promptText(promptRequest.getPromptText())
                .systemInstruction(promptRequest.getSystemInstruction())
                .targetModel(promptRequest.getTargetModel() != null ? promptRequest.getTargetModel() : "GPT-4")
                .aiTool(promptRequest.getAiTool() != null ? promptRequest.getAiTool() : "ChatGPT")
                .externalChatUrl(promptRequest.getExternalChatUrl())
                .externalChatId(promptRequest.getExternalChatId())
                .chatSummary(promptRequest.getChatSummary())
                .isPublic(promptRequest.getIsPublic() != null ? promptRequest.getIsPublic() : true)
                .user(user)
                .category(category)
                .tags(tags)
                .build();

        Prompt savedPrompt = promptRepository.save(prompt);
        return promptMapper.toPromptResponse(savedPrompt);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<PromptResponse> searchPrompts(String search, String categorySlug, String tagSlug, String aiTool, int page, int size, String sortBy, String sortDir, String currentUsername) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Prompt> spec = PromptSpecification.filterPrompts(search, categorySlug, tagSlug, aiTool, true, null);
        Page<Prompt> promptsPage = promptRepository.findAll(spec, pageable);

        List<PromptResponse> content = promptsPage.getContent().stream()
                .map(promptMapper::toPromptResponse)
                .collect(Collectors.toList());

        return PagedResponse.<PromptResponse>builder()
                .content(content)
                .page(promptsPage.getNumber())
                .size(promptsPage.getSize())
                .totalElements(promptsPage.getTotalElements())
                .totalPages(promptsPage.getTotalPages())
                .last(promptsPage.isLast())
                .build();
    }

    @Override
    @Transactional
    public PromptResponse getPromptById(Long id) {
        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", id));

        prompt.setViewCount(prompt.getViewCount() + 1);
        Prompt saved = promptRepository.save(prompt);
        return promptMapper.toPromptResponse(saved);
    }

    @Override
    @Transactional
    public PromptResponse updatePrompt(Long id, PromptRequest promptRequest, String username) {
        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", id));

        if (!prompt.getUser().getUsername().equals(username)) {
            throw new BadRequestException("You are not authorized to edit this prompt!");
        }

        Category category = categoryRepository.findById(promptRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", promptRequest.getCategoryId()));

        Set<Tag> tags = new HashSet<>();
        if (promptRequest.getTagIds() != null && !promptRequest.getTagIds().isEmpty()) {
            tags.addAll(tagRepository.findAllById(promptRequest.getTagIds()));
        }

        prompt.setTitle(promptRequest.getTitle());
        prompt.setDescription(promptRequest.getDescription());
        prompt.setPromptText(promptRequest.getPromptText());
        prompt.setSystemInstruction(promptRequest.getSystemInstruction());
        prompt.setTargetModel(promptRequest.getTargetModel());
        if (promptRequest.getAiTool() != null) prompt.setAiTool(promptRequest.getAiTool());
        prompt.setExternalChatUrl(promptRequest.getExternalChatUrl());
        prompt.setExternalChatId(promptRequest.getExternalChatId());
        prompt.setChatSummary(promptRequest.getChatSummary());
        prompt.setIsPublic(promptRequest.getIsPublic());
        prompt.setCategory(category);
        prompt.setTags(tags);

        Prompt updatedPrompt = promptRepository.save(prompt);
        return promptMapper.toPromptResponse(updatedPrompt);
    }

    @Override
    @Transactional
    public void deletePrompt(Long id, String username) {
        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", id));

        if (!prompt.getUser().getUsername().equals(username)) {
            throw new BadRequestException("You are not authorized to delete this prompt!");
        }

        promptRepository.delete(prompt);
    }

    @Override
    @Transactional
    public PromptResponse toggleFavorite(Long id) {
        Prompt prompt = promptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prompt", "id", id));

        prompt.setIsFavorite(!prompt.getIsFavorite());
        Prompt updated = promptRepository.save(prompt);
        return promptMapper.toPromptResponse(updated);
    }
}
