package com.example.lms.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    // In a real app, resolve current user from JWT
    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        Map<String, Object> body = Map.of(
                "personal", Map.of(
                        "name", "Mustafa Aqeel",
                        "dob", "11/11/2001",
                        "gender", "Male",
                        "email", "f200117@cfd.nu.edu.pk",
                        "cnic", "35202-8216137-5",
                        "mobile", "0313-4605512",
                        "bloodGroup", "O",
                        "nationality", "Pakistan"),
                "student", Map.of(
                        "rollNumber", "20F-0117",
                        "degree", "BSCS",
                        "batch", "2020",
                        "section", "8A",
                        "campus", "Chiniot Faisalabad",
                        "status", "Current"));
        return ResponseEntity.ok(body);
    }
}
