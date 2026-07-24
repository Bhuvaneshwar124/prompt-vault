package com.promptvault.mapper;

import com.promptvault.dto.CommentResponse;
import com.promptvault.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    @Autowired
    private UserMapper userMapper;

    public CommentResponse toCommentResponse(Comment comment) {
        if (comment == null) return null;

        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(userMapper.toUserResponse(comment.getUser()))
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
