package com.example.lms.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CourseController {

    @GetMapping("/students/me/courses")
    public ResponseEntity<?> myCourses() {
        List<Map<String, Object>> list = List.of(
                Map.of(
                        "code", "CS101",
                        "title", "Intro to Programming",
                        "credits", 3,
                        "description",
                        "Fundamentals of programming, problem solving, and core concepts using a modern language."),
                Map.of(
                        "code", "CS201",
                        "title", "Data Structures",
                        "credits", 4,
                        "description",
                        "Lists, stacks, queues, trees, graphs and algorithmic trade-offs for performance."));
        return ResponseEntity.ok(list);
    }

    @GetMapping("/courses/available")
    public ResponseEntity<?> availableCourses() {
        List<Map<String, Object>> list = List.of(
            Map.of("id", 1, "code", "CS301", "title", "Algorithms"),
            Map.of("id", 2, "code", "CS302", "title", "Operating Systems")
        );
        return ResponseEntity.ok(list);
    }
