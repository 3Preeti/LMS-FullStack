/**package com.lms.backend.config;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.lms.backend.entity.Role;
import com.lms.backend.entity.User;
import com.lms.backend.repository.RoleRepository;
import com.lms.backend.repository.UserRepository;

@Component
public class DataTestRunner implements CommandLineRunner{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {

            Role role = roleRepository.findByRoleName("ADMIN")
                    .orElseGet(() -> roleRepository.save(new Role("ADMIN")));

            User user = new User();
            user.setName("Test User");
            user.setEmail("testuser@gmail.com");
            user.setPassword("password123");
            user.setRole(role);
            user.setCreatedAt(LocalDateTime.now());

            userRepository.save(user);

            System.out.println("✅ User saved successfully");
        };
    }**/
