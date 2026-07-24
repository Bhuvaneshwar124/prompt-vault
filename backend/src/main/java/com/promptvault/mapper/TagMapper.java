package com.promptvault.mapper;

import com.promptvault.dto.TagResponse;
import com.promptvault.entity.Tag;
import org.springframework.stereotype.Component;

@Component
public class TagMapper {

    public TagResponse toTagResponse(Tag tag) {
        if (tag == null) {
            return null;
        }

        return TagResponse.builder()
                .id(tag.getId())
                .name(tag.getName())
                .slug(tag.getSlug())
                .createdAt(tag.getCreatedAt())
                .build();
    }
}
