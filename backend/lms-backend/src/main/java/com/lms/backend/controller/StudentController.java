package com.lms.backend.controller;

import com.lms.backend.entity.Course;
import com.lms.backend.entity.Enrollment;
import com.lms.backend.entity.User;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.EnrollmentRepository;
import com.lms.backend.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public StudentController(
            EnrollmentRepository enrollmentRepository,
            UserRepository userRepository,
            CourseRepository courseRepository) {

        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    // ✅ EXISTING API (KEEP IT)
    @GetMapping("/dashboard")
    public String studentDashboard() {
        return "STUDENT dashboard";
    }

    // ✅ NEW API — ENROLL COURSE
    @PostMapping("/enroll/{courseId}")
    public String enrollCourse(
            @PathVariable Long courseId,
            Authentication authentication) {

        User student = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();

        Course course = courseRepository
                .findById(courseId)
                .orElseThrow();

        enrollmentRepository
                .findByStudent_UserIdAndCourse_CourseId(
                        student.getUserId(), courseId)
                .ifPresent(e -> {
                    throw new RuntimeException("Already enrolled");
                });

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);

        enrollmentRepository.save(enrollment);

        return "Enrollment request sent successfully";
    }
}

