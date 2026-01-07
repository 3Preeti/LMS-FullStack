package com.lms.backend.service;

import com.lms.backend.entity.Course;
import com.lms.backend.entity.Enrollment;
import com.lms.backend.entity.User;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.EnrollmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
    }

    public Enrollment enroll(User student, Long courseId) {

        // prevent duplicate enroll
        enrollmentRepository
            .findByStudent_UserIdAndCourse_CourseId(student.getUserId(), courseId)
            .ifPresent(e -> {
                throw new RuntimeException("Already enrolled in this course");
            });

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setStatus("PENDING");

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getMyEnrollments1(User student) {
        return enrollmentRepository.findByStudent(student);
    }

}
