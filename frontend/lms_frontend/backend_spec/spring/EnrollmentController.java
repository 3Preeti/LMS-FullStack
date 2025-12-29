package com.example.lms.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class EnrollmentController {

    @PostMapping("/enrollments")
    public ResponseEntity<?> enroll(@RequestBody Map<String, Object> payload) {
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "enrolledCourseId", payload.get("courseId")));
    }
}
