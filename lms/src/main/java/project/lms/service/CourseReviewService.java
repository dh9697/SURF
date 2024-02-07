package project.lms.service;

import java.util.List;

import project.lms.dto.CourseReviewDto;
import project.lms.dto.ResponseDto;

public interface CourseReviewService {

	// 모든 수강평 조회
    ResponseDto<List<CourseReviewDto>> getAllReviews();
    
    // 수강평Id로 수강평 조회
    ResponseDto<CourseReviewDto> getCourseReview(Long reviewId);

    // 특정 회원이 작성한 모든 수강평 조회
    ResponseDto<List<CourseReviewDto>> getReviewsByMemberId(Long memberId);
    
    // 특정 강의에 대한 모든 수강평 조회
    ResponseDto<List<CourseReviewDto>> getReviewsByCourseId(Long courseId);
    
    // 수강평 저장
    ResponseDto<CourseReviewDto> saveCourseReview(CourseReviewDto courseReviewDto);
    
    // 수강평 수정
    ResponseDto<CourseReviewDto> updateCourseReview(CourseReviewDto courseReviewDto);
    
    // 수강평 삭제
    ResponseDto<String> deleteCourseReview(Long reviewId);
}
