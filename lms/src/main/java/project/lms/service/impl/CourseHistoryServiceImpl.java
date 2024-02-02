package project.lms.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.CourseHistory;
import project.lms.model.Member;
import project.lms.model.OrderDetail;
import project.lms.repository.CourseHistoryRepository;
import project.lms.repository.MemberRepository;
import project.lms.repository.OrderDetailRepository;
import project.lms.service.CourseHistoryService;
import project.lms.util.SecurityUtil;

@Service
public class CourseHistoryServiceImpl implements CourseHistoryService{

	private final CourseHistoryRepository courseHistoryRepository;

	private final MemberRepository memberRepository;

	private final OrderDetailRepository orderDetailRepository;
	
	@Autowired
	public CourseHistoryServiceImpl(CourseHistoryRepository courseHistoryRepository, MemberRepository memberRepository,
			OrderDetailRepository orderDetailRepository) {
		super();
		this.courseHistoryRepository = courseHistoryRepository;
		this.memberRepository = memberRepository;
		this.orderDetailRepository = orderDetailRepository;
	}

	// 전체 조회
	@Override
	public ResponseDto<List<CourseHistory>> getAllCourseHistories(){
		List<CourseHistory> courseHistories = courseHistoryRepository.findAll();
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				courseHistories,
				"모든 courseHistory를 조회하였습니다.");
	}
	
	// 강의별 조회
	@Override
	public ResponseDto<List<CourseHistory>> getCourseHistoriesByCourse(Long courseId){
		List<CourseHistory> courseHistories = courseHistoryRepository.findByCourseCourseId(courseId);
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				courseHistories,
				"courseHistory를 course에 따라 조회하였습니다.");
	}
	
	// 로그인 유저의 조회
	private Member getCurrentUser() {
        String username = SecurityUtil.getCurrentloginId()
                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
        
        return memberRepository.findByLoginId(username);
    }
	
	public ResponseDto<List<CourseHistory>> getMyCourseHistories() {
		Member member = getCurrentUser();
		List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderMember(member);
		
		List<CourseHistory> courseHistories = new ArrayList<>();
		if (orderDetails.isEmpty()) {
			for (OrderDetail orderDetail : orderDetails) {
				CourseHistory courseHistory = new CourseHistory();
				courseHistory.setMember(member);
				courseHistory.setCourse(orderDetail.getCourse());
				courseHistory.setStartDate(orderDetail.getOrder().getPaymentDate());
				courseHistory.setEndDate(orderDetail.getExpirationDate());
				courseHistories.add(courseHistory);
				
				courseHistoryRepository.save(courseHistory);
			}
		}
		
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				courseHistories,
				"로그인한 사용자가 수강 중인 courseHistory를 조회하였습니다.");
	}
}
