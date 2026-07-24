package com.promptvault.service;

import com.promptvault.dto.TagRequest;
import com.promptvault.dto.TagResponse;

import java.util.List;

public interface TagService {
    TagResponse createTag(TagRequest tagRequest);
    List<TagResponse> getAllTags();
    List<TagResponse> searchTags(String query);
    TagResponse getTagBySlug(String slug);
    void deleteTag(Long id);
}
