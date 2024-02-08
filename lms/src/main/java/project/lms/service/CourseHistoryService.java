package project.lms.service;

import java.util.List;

import project.lms.dto.CourseHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.model.CourseHistory;

public interface CourseHistoryService {
	
	public ResponseDto<List<CourseHistory>> getAllCourseHistories();
	
	public ResponseDto<List<CourseHistory>> getCourseHistoriesByCourse(Long courseId);

	public ResponseDto<List<CourseHistoryDto>> getMyCourseHistories();
	
	public ResponseDto<CourseHistoryDto> updateCourseHistoryStatus(Long courseHistoryId); // 추가 코드

//  // 특정 강좌의 수강 이력 개수 조회
//  ResponseDto<Long> getCourseHistoryCountByCourse(Course course);

//    // 특정 회원의 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getCourseHistoryByMember(Member member);
//
//    // 특정 강좌의 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getCourseHistoryByCourse(Course course);
//
//    // 특정 날짜 범위 내의 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getCourseHistoryInDateRange(LocalDate startDate, LocalDate endDate);
//
//    // 특정 회원과 강좌의 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getCourseHistoryByMemberAndCourse(Member member, Course course);
//
//    // 종료일이 null인(아직 종료되지 않은) 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getOngoingCourseHistory();
//
//    // 특정 날짜 이후에 종료된 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getCourseHistoryEndedAfter(LocalDate date);
//
//    // 특정 회원의 가장 최근 수강 이력 조회
//    ResponseDto<CourseHistory> getLatestCourseHistoryForMember(Member member);
//
//
//    // 종료일이 null이고 시작일이 특정 날짜 이전인 수강 이력 조회
//    ResponseDto<List<CourseHistory>> getOngoingCourseHistoryBeforeDate(LocalDate date);
}