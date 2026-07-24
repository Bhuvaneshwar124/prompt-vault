package com.promptvault.service;

import com.promptvault.dto.JwtAuthResponse;
import com.promptvault.dto.LoginRequest;
import com.promptvault.dto.RegisterRequest;
import com.promptvault.dto.UserResponse;

public interface AuthService {
    UserResponse registerUser(RegisterRequest registerRequest);
    JwtAuthResponse loginUser(LoginRequest loginRequest);
    UserResponse getCurrentUser(String username);
}
