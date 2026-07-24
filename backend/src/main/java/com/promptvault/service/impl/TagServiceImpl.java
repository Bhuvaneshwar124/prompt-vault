package com.promptvault.service.impl;

import com.promptvault.dto.TagRequest;
import com.promptvault.dto.TagResponse;
import com.promptvault.entity.Tag;
import com.promptvault.exception.BadRequestException;
import com.promptvault.exception.ResourceNotFoundException;
import com.promptvault.mapper.TagMapper;
import com.promptvault.repository.TagRepository;
import com.promptvault.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private TagMapper tagMapper;

    @Override
    @Transactional
    public TagResponse createTag(TagRequest tagRequest) {
        String cleanName = tagRequest.getName().trim().toLowerCase(Locale.ENGLISH);
        
        if (tagRepository.existsByName(cleanName)) {
            throw new BadRequestException("Tag '" + cleanName + "' already exists!");
        }

        String slug = generateSlug(cleanName);

        Tag tag = Tag.builder()
                .name(cleanName)
                .slug(slug)
                .build();

        Tag savedTag = tagRepository.save(tag);
        return tagMapper.toTagResponse(savedTag);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagResponse> getAllTags() {
        return tagRepository.findAll().stream()
                .map(tagMapper::toTagResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<TagResponse> searchTags(String query) {
        return tagRepository.findByNameContainingIgnoreCase(query).stream()
                .map(tagMapper::toTagResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TagResponse getTagBySlug(String slug) {
        Tag tag = tagRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Tag", "slug", slug));
        return tagMapper.toTagResponse(tag);
    }

    @Override
    @Transactional
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag", "id", id));
        tagRepository.delete(tag);
    }

    private String generateSlug(String text) {
        return text.toLowerCase(Locale.ENGLISH)
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("[\\s-]+", "-")
                .replaceAll("^-+|-+$", "");
    }
}
