package project.lms.controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.CourseHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.model.CourseHistory;
import project.lms.service.CourseHistoryService;

@RestController
@RequestMapping("/api/course-histories")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CourseHistoryController {

	private final CourseHistoryService courseHistoryService;

	@Autowired
	public CourseHistoryController(CourseHistoryService courseHistoryService) {
		super();
		this.courseHistoryService = courseHistoryService;
	}
	
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<CourseHistory>>> getAllCourseHistories() {
		ResponseDto<List<CourseHistory>> courseHistories = courseHistoryService.getAllCourseHistories();
		return new ResponseEntity<>(courseHistories, HttpStatus.OK);
	}
	
	@GetMapping("/list/{courseId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoriesByCourse(@PathVariable Long courseId) {
		ResponseDto<List<CourseHistory>> courseHistories = courseHistoryService.getCourseHistoriesByCourse(courseId);
		return new ResponseEntity<>(courseHistories, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<ResponseDto<List<CourseHistoryDto>>> getMyCourseHistories() {
		ResponseDto<List<CourseHistoryDto>> courseHistoryDtos = courseHistoryService.getMyCourseHistories();
		return new ResponseEntity<>(courseHistoryDtos, HttpStatus.OK);
	}
}
