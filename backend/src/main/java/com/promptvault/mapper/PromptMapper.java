package com.promptvault.mapper;

import com.promptvault.dto.PromptResponse;
import com.promptvault.entity.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class PromptMapper {

    @Autowired
    private CategoryMapper categoryMapper;

    @Autowired
    private TagMapper tagMapper;

    @Autowired
    private UserMapper userMapper;

    private static final Pattern VARIABLE_PATTERN = Pattern.compile("\\{\\{([^}]+)\\}\\}");

    public PromptResponse toPromptResponse(Prompt prompt) {
        if (prompt == null) {
            return null;
        }

        return PromptResponse.builder()
                .id(prompt.getId())
                .title(prompt.getTitle())
                .description(prompt.getDescription())
                .promptText(prompt.getPromptText())
                .systemInstruction(prompt.getSystemInstruction())
                .targetModel(prompt.getTargetModel())
                .aiTool(prompt.getAiTool())
                .externalChatUrl(prompt.getExternalChatUrl())
                .externalChatId(prompt.getExternalChatId())
                .chatSummary(prompt.getChatSummary())
                .isPublic(prompt.getIsPublic())
                .isFavorite(prompt.getIsFavorite())
                .viewCount(prompt.getViewCount())
                .likeCount(prompt.getLikeCount())
                .category(categoryMapper.toCategoryResponse(prompt.getCategory()))
                .tags(prompt.getTags().stream()
                        .map(tagMapper::toTagResponse)
                        .collect(Collectors.toSet()))
                .author(userMapper.toUserResponse(prompt.getUser()))
                .extractedVariables(extractVariables(prompt.getPromptText()))
                .createdAt(prompt.getCreatedAt())
                .updatedAt(prompt.getUpdatedAt())
                .build();
    }

    private List<String> extractVariables(String text) {
        List<String> variables = new ArrayList<>();
        if (text == null) return variables;

        Matcher matcher = VARIABLE_PATTERN.matcher(text);
        while (matcher.find()) {
            String varName = matcher.group(1).trim();
            if (!variables.contains(varName)) {
                variables.add(varName);
            }
        }
        return variables;
    }
}
