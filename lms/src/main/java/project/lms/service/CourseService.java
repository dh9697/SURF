package project.lms.service;

import java.util.List;
import java.util.Optional;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Course;

public interface CourseService {

	public ResponseDto<CourseDto> saveCourseWithThumbnail(CourseDto courseDto);
	
	public Optional<Course> getCourseWithThumbnail(Long courseId);

	public List<Course> getAllCourses();

	public ResponseDto<List<Course>> getAllCourseWithThumbnail();
	
	public ResponseDto<List<Course>> getCoursesForSubject(Long subjectId);
	
	public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto);
	
	public ResponseDto<String> deleteCourse(Long courseId);
}
