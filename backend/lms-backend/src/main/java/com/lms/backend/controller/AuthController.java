package com.lms.backend.controller;

import com.lms.backend.dto.LoginRequest;
import com.lms.backend.dto.RegisterRequest;
import com.lms.backend.entity.Role;
import com.lms.backend.entity.User;
import com.lms.backend.repository.RoleRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.security.JwtUtil;
//import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/auth")
public class AuthController {

	 private final UserRepository userRepository;
	 private final RoleRepository roleRepository;
	 private final PasswordEncoder passwordEncoder;
	 private final AuthenticationManager authenticationManager;
	 private final JwtUtil jwtUtil;


	    public AuthController(AuthenticationManager authenticationManager,
	                          JwtUtil jwtUtil,
	                          UserRepository userRepository,
	                          RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
	        this.authenticationManager = authenticationManager;
	        this.jwtUtil = jwtUtil;
	        this.userRepository = userRepository;
	        this.roleRepository = roleRepository;
	        this.passwordEncoder = passwordEncoder;

	    }
    
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        // check duplicate email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        Role role = roleRepository
                .findByRoleName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // (we’ll encrypt later)
        user.setRole(role);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        
        return jwtUtil.generateToken(user.getEmail());
    }
    

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        Authentication authentication =
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
                )
            );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        String token = jwtUtil.generateToken(user.getEmail());

        return Map.of(
            "token", token,
            "role", user.getRole().getRoleName()
        );
    }
    }

