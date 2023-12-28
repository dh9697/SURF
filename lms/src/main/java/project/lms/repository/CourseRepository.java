package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	
}
