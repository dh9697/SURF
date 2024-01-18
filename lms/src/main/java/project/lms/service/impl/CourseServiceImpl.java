package project.lms.service.impl;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Course;
import project.lms.repository.CourseRepository;
import project.lms.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService{

	@Autowired
	private final CourseRepository courseRepository;

	public CourseServiceImpl(CourseRepository courseRepository) {
		super();
		this.courseRepository = courseRepository;
	}
	
	@Transactional
	public ResponseDto<CourseDto> saveCourseWithThumbnail(CourseDto courseDto) {
		try{MultipartFile thumbnail = courseDto.getCourseThumbnail();
		
		Course course = new Course();
		course.setCourseName(courseDto.getCourseName());
		course.setDescription(courseDto.getDescription());
		course.setDurationMins(courseDto.getDurationMins());
		course.setContentLevel(courseDto.getContentLevel());
		course.setPrice(courseDto.getPrice());
		course.setAnnouncement(courseDto.getAnnouncement());
		
		if (thumbnail != null && !thumbnail.isEmpty()) {
			course.setCourseThumbnail(thumbnail.getBytes());
		}
		
		courseRepository.save(course);
		return new ResponseDto<CourseDto>(
				ResultCode.SUCCESS.name(),
				courseDto,
				"success saving course");
//	}catch (IOException e) {
		throw new InvalidRequestException("Error saving course with thumbnail.", "ha..");
	}
	}
	public Optional<Course> getCourseWithThumbnail(Long courseId) {
		return courseRepository.findById(courseId);
	}
}
