package com.promptvault.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthResponse {

    private String accessToken;
    @Builder.Default
    private String tokenType = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
}
