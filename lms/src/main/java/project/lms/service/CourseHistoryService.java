package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.CourseHistory;
import project.lms.repository.CourseHistoryRepository;

@Service
public class CourseHistoryService {

	private final CourseHistoryRepository courseHistoryRepository;

	public CourseHistoryService(CourseHistoryRepository courseHistoryRepository) {
		super();
		this.courseHistoryRepository = courseHistoryRepository;
	}
	
	public List<CourseHistory> getAllCourseHistories(){
		return courseHistoryRepository.findAll();
	}
	
	public CourseHistory createCourseHistory(CourseHistory courseHistory) {
		return courseHistoryRepository.save(courseHistory);
	}
	
}
