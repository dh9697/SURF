package project.lms.service;

import java.util.Optional;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Course;

public interface CourseService {
	public ResponseDto<CourseDto> saveCourseWithThumbnail(CourseDto courseDto);
	public Optional<Course> getCourseWithThumbnail(Long courseId);
}
