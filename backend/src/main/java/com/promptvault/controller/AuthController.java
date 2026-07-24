package com.promptvault.controller;

import com.promptvault.dto.ApiResponse;
import com.promptvault.dto.JwtAuthResponse;
import com.promptvault.dto.LoginRequest;
import com.promptvault.dto.RegisterRequest;
import com.promptvault.dto.UserResponse;
import com.promptvault.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        UserResponse response = authService.registerUser(registerRequest);
        return new ResponseEntity<>(ApiResponse.success("User registered successfully!", response), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<JwtAuthResponse>> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtAuthResponse jwtResponse = authService.loginUser(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("User logged in successfully!", jwtResponse));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(Authentication authentication) {
        UserResponse userResponse = authService.getCurrentUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("User profile fetched successfully!", userResponse));
    }
}
