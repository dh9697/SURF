package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Content;
import project.lms.model.Course;

public interface ContentRepository extends JpaRepository<Content, Long> {

	List<Content> findByCourse(Course course);
	
}