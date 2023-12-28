package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Course;
import project.lms.repository.CourseRepository;

@Service
public class CourseService {
	
	private final CourseRepository courseRepository;

	public CourseService(CourseRepository courseRepository) {
		super();
		this.courseRepository = courseRepository;
	}
	
	public List<Course> getAllCourses(){
		return courseRepository.findAll();
	}
	
	public Course createCourse(Course course) {
		return courseRepository.save(course);
	}
}
