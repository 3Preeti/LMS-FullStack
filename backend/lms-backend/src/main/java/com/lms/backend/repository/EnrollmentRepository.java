package com.lms.backend.repository;

import com.lms.backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByStudent_UserIdAndCourse_CourseId(
            Long studentId,
            Long courseId
    );
}


