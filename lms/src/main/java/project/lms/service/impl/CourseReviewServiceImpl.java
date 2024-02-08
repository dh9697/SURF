package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.lms.dto.CourseReviewDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.repository.CourseReviewRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.CourseReviewService;
import project.lms.repository.CourseHistoryRepository;
import project.lms.repository.CourseRepository;
import project.lms.model.Member;
import project.lms.model.Course;
import project.lms.model.CourseHistory;
import project.lms.model.CourseReview;
import project.lms.exception.InvalidRequestException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseReviewServiceImpl implements CourseReviewService {

    private CourseReviewRepository courseReviewRepository;
    
    private CourseHistoryRepository courseHistoryRepository;

    private MemberRepository memberRepository;

    private CourseRepository courseRepository;

    @Autowired
    public CourseReviewServiceImpl(CourseReviewRepository courseReviewRepository, CourseHistoryRepository courseHistoryRepository, MemberRepository memberRepository, CourseRepository courseRepository) {
        super();
        this.courseReviewRepository = courseReviewRepository;
        this.courseHistoryRepository = courseHistoryRepository;
        this.memberRepository = memberRepository;
        this.courseRepository = courseRepository;
    }

    // 모든 리뷰를 조회하여 CourseReviewDto 리스트로 반환하는 메서드

    @Override
    public ResponseDto<List<CourseReviewDto>> getAllReviews() {
        List<CourseReviewDto> courseReviewDtos = courseReviewRepository.findAll().stream()
            .map(CourseReviewDto::from)
            .collect(Collectors.toList());
        return new ResponseDto<>(ResultCode.SUCCESS.name(), courseReviewDtos, "모든 코스 리뷰를 조회하였습니다.");
    }
        
    // reviewId를 기반으로 해당 리뷰를 조회하여 CourseReviewDto로 반환하는 메서드
    @Override
    public ResponseDto<CourseReviewDto> getCourseReview(Long reviewId) {
    	CourseReviewDto courseReviewDto = CourseReviewDto.from(courseReviewRepository.findById(reviewId)
                .orElseThrow(() -> new InvalidRequestException("Review not found", "해당 수강평을 찾을 수 없습니다.")));
            return new ResponseDto<>(ResultCode.SUCCESS.name(), courseReviewDto, "해당 코스 리뷰를 조회하였습니다.");
    	
    }

    // memberId를 기반으로 해당 사용자의 모든 리뷰를 조회하여 CourseReviewDto 리스트로 반환하는 메서드
    @Override
    public ResponseDto<List<CourseReviewDto>> getReviewsByMemberId(Long memberId) {
    	List<CourseReviewDto> courseReviewDtos = courseReviewRepository.findByMember_MemberId(memberId).stream()
                .map(CourseReviewDto::from)
                .collect(Collectors.toList());
            return new ResponseDto<>(ResultCode.SUCCESS.name(), courseReviewDtos, "해당 회원의 모든 코스 리뷰를 조회하였습니다.");
    }

    // courseId를 기반으로 해당 강의의 모든 리뷰를 조회하여 CourseReviewDto 리스트로 반환하는 메서드
    @Override
    public ResponseDto<List<CourseReviewDto>> getReviewsByCourseId(Long courseId) {
        List<CourseReviewDto> courseReviewDtos = courseReviewRepository.findByCourse_CourseId(courseId).stream()
            .map(CourseReviewDto::from)
            .collect(Collectors.toList());
        return new ResponseDto<>(ResultCode.SUCCESS.name(), courseReviewDtos, "해당 강좌의 모든 리뷰를 조회하였습니다.");
    }

    // 리뷰를 생성하고, 저장한 후 CourseReviewDto로 반환하는 메서드
    @Override
    public ResponseDto<CourseReviewDto> saveCourseReview(CourseReviewDto courseReviewDto) {
        Member member = memberRepository.findById(courseReviewDto.getMember().getMemberId())
            .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
        Course course = courseRepository.findById(courseReviewDto.getCourse().getCourseId())
            .orElseThrow(() -> new InvalidRequestException("Course not found", "해당 강의를 찾을 수 없습니다."));

        // CourseHistory를 확인하여 해당 회원이 수강 중인 강의인지 확인
        CourseHistory courseHistory = courseHistoryRepository.findByMemberAndCourse(member, course);
        if (courseHistory == null) {
            throw new InvalidRequestException("Invalid Course", "회원이 수강 중이지 않은 강의에 대해 수강평을 작성할 수 없습니다.");
        }

        CourseReview courseReview = new CourseReview();
        courseReview.setMember(member);
        courseReview.setCourse(course);
        courseReview.setComment(courseReviewDto.getComment());
        courseReview.setRating(courseReviewDto.getRating());
        courseReview = courseReviewRepository.save(courseReview);
        CourseReviewDto savedCourseReviewDto = CourseReviewDto.from(courseReview);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), savedCourseReviewDto, "리뷰가 성공적으로 저장되었습니다.");
    }

    // 리뷰를 업데이트하고, 업데이트된 리뷰를 CourseReviewDto로 반환하는 메서드
    @Override
    public ResponseDto<CourseReviewDto> updateCourseReview(CourseReviewDto courseReviewDto) {
        CourseReview courseReview = courseReviewRepository.findById(courseReviewDto.getReviewId())
            .orElseThrow(() -> new InvalidRequestException("Review not found", "해당 수강평을 찾을 수 없습니다."));
        courseReview.setComment(courseReviewDto.getComment());
        courseReview = courseReviewRepository.save(courseReview);
        CourseReviewDto updatedCourseReviewDto = CourseReviewDto.from(courseReview);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedCourseReviewDto, "리뷰가 성공적으로 업데이트되었습니다.");
    }

    // 리뷰를 삭제하는 메서드
    @Override
    public ResponseDto<String> deleteCourseReview(Long reviewId) {
        if (!courseReviewRepository.existsById(reviewId)) {
            throw new InvalidRequestException("Review not found", "해당 수강평을 찾을 수 없습니다.");
        }
        courseReviewRepository.deleteById(reviewId);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "리뷰가 성공적으로 삭제되었습니다.");
    }
}