package com.lms.backend.repository;

import com.lms.backend.entity.Enrollment;
import com.lms.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    Optional<Enrollment> findByStudent_UserIdAndCourse_CourseId(
            Long studentId,
            Long courseId
    );
    List<Enrollment> findByStudent(User student);
	//Optional<Course> findByStudentAndCourse_Id(User student, Long courseId);

}


