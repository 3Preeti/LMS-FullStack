package com.lms.backend.controller;

import com.lms.backend.entity.Course;
import com.lms.backend.entity.Enrollment;
import com.lms.backend.entity.User;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.EnrollmentRepository;
import com.lms.backend.repository.UserRepository;
import com.lms.backend.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
public class StudentController {

	private final EnrollmentService enrollmentService;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public StudentController(
            EnrollmentRepository enrollmentRepository,
            UserRepository userRepository,
            CourseRepository courseRepository,
            EnrollmentService enrollmentService) {

        this.enrollmentService = enrollmentService;
		this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    // ✅ EXISTING API (KEEP IT)
    @GetMapping("/dashboard")
    public String studentDashboard() {
        return "STUDENT dashboard";
    }

    @GetMapping("/my-enrollments")
    public ResponseEntity<?> myEnrollments(Authentication authentication) {

        User student = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                enrollmentService.getMyEnrollments1(student)
        );
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

