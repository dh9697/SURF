package project.lms.service;

import java.util.List;
import java.util.Optional;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Course;

public interface CourseService {

	public ResponseDto<CourseDto> saveCourse(CourseDto courseDto);
	
	public List<CourseDto> getAllCourses();
	
	public ResponseDto<CourseDto> getCourse(Long courseId);
	
	public ResponseDto<List<CourseDto>> getCoursesForSubject(Long subjectId);
	
	public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto);

	public ResponseDto<String> deleteCourse(Long courseId);
}
