package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.CourseReviewDto;
import project.lms.dto.ResponseDto;
import project.lms.service.CourseReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/course-reviews")
@CrossOrigin(origins="http://localhost:3000",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CourseReviewController {

    private final CourseReviewService courseReviewService;

    @Autowired
    public CourseReviewController(CourseReviewService courseReviewService) {
        super();
        this.courseReviewService = courseReviewService;
    }
    
    // 모든 리뷰를 조회하여 반환하는 메서드
    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<CourseReviewDto>>> getAllReviews() {
        ResponseDto<List<CourseReviewDto>> responseDto = courseReviewService.getAllReviews();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // reviewId를 기반으로 해당 리뷰를 조회하여 반환하는 메서드
    @GetMapping("/{reviewId}")
    public ResponseEntity<ResponseDto<CourseReviewDto>> getCourseReview(@PathVariable Long reviewId) {
        ResponseDto<CourseReviewDto> responseDto = courseReviewService.getCourseReview(reviewId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // memberId를 기반으로 해당 사용자의 모든 리뷰를 조회하여 반환하는 메서드
    @GetMapping("/list/member/{memberId}")
    public ResponseEntity<ResponseDto<List<CourseReviewDto>>> getReviewsByMemberId(@PathVariable Long memberId) {
        ResponseDto<List<CourseReviewDto>> responseDto = courseReviewService.getReviewsByMemberId(memberId); 
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // courseId를 기반으로 해당 강의의 모든 리뷰를 조회하여 반환하는 메서드
    @GetMapping("/list/course/{courseId}")
    public ResponseEntity<ResponseDto<List<CourseReviewDto>>> getReviewsByCourseId(@PathVariable Long courseId) {
        ResponseDto<List<CourseReviewDto>> responseDto = courseReviewService.getReviewsByCourseId(courseId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 리뷰를 생성하고, 저장한 후 반환하는 메서드
    @PostMapping 
    public ResponseEntity<ResponseDto<CourseReviewDto>> saveCourseReview(@RequestBody CourseReviewDto courseReviewDto) {
        ResponseDto<CourseReviewDto> responseDto = courseReviewService.saveCourseReview(courseReviewDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 리뷰를 업데이트하고, 업데이트된 리뷰를 반환하는 메서드
    @PutMapping("/{reviewId}")
    public ResponseEntity<ResponseDto<CourseReviewDto>> updateCourseReview(@PathVariable Long reviewId, @RequestBody CourseReviewDto courseReviewDto) {
        ResponseDto<CourseReviewDto> responseDto = courseReviewService.updateCourseReview(courseReviewDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // 리뷰를 삭제하는 메서드
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ResponseDto<String>> deleteCourseReview(@PathVariable Long reviewId) {
        ResponseDto<String> response = courseReviewService.deleteCourseReview(reviewId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}