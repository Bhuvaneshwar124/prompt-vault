package com.promptvault.controller;

import com.promptvault.dto.ApiResponse;
import com.promptvault.dto.TagRequest;
import com.promptvault.dto.TagResponse;
import com.promptvault.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping
    public ResponseEntity<ApiResponse<TagResponse>> createTag(@Valid @RequestBody TagRequest tagRequest) {
        TagResponse response = tagService.createTag(tagRequest);
        return new ResponseEntity<>(ApiResponse.success("Tag created successfully!", response), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TagResponse>>> getAllTags() {
        List<TagResponse> tags = tagService.getAllTags();
        return ResponseEntity.ok(ApiResponse.success("Tags retrieved successfully!", tags));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<TagResponse>>> searchTags(@RequestParam("query") String query) {
        List<TagResponse> tags = tagService.searchTags(query);
        return ResponseEntity.ok(ApiResponse.success("Tags matching query retrieved!", tags));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<TagResponse>> getTagBySlug(@PathVariable String slug) {
        TagResponse response = tagService.getTagBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Tag retrieved successfully!", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return ResponseEntity.ok(ApiResponse.success("Tag deleted successfully!"));
    }
}
