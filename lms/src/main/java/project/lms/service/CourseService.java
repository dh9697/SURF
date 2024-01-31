package project.lms.service;

import java.util.List;
import java.util.Optional;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Course;

public interface CourseService {

	public ResponseDto<CourseDto> saveCourse(CourseDto courseDto);
	
	public ResponseDto<List<CourseDto>> getAllCourses();

	public ResponseDto<CourseDto> getCourseByCourseId(Long courseId);
	
	public ResponseDto<List<CourseDto>> getCoursesBySubjectId(Long subjectId);

	public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto);

	public ResponseDto<String> deleteCourse(Long courseId);
	
	Course findById(Long courseId);
}
