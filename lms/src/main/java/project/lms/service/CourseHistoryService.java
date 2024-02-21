package project.lms.service;

import java.util.List;

import project.lms.dto.CourseHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.model.CourseHistory;

public interface CourseHistoryService {
	
	public ResponseDto<List<CourseHistory>> getAllCourseHistories();
	
	public ResponseDto<List<CourseHistory>> getCourseHistoriesByCourse(Long courseId);

	public ResponseDto<List<CourseHistoryDto>> getMyCourseHistories();
	
	public ResponseDto<CourseHistoryDto> updateCourseHistoryStatus(Long courseHistoryId); 


}