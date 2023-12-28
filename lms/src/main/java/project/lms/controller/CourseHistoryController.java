package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.CourseHistory;
import project.lms.service.CourseHistoryService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CourseHistoryController {

	private final CourseHistoryService courseHistoryService;

	@Autowired
	public CourseHistoryController(CourseHistoryService courseHistoryService) {
		super();
		this.courseHistoryService = courseHistoryService;
	}
	
	@GetMapping("/coursehistory")
	public List<CourseHistory> getAllCourseHistories(){
		return courseHistoryService.getAllCourseHistories();
	}
	
	@PostMapping("/coursehistory")
	public CourseHistory createCourseHistory(@RequestBody CourseHistory courseHistory) {
		return courseHistoryService.createCourseHistory(courseHistory);
	}
}
