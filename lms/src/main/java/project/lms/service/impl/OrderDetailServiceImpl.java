package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Member;
import project.lms.model.OrderDetail;
import project.lms.repository.MemberRepository;
import project.lms.repository.OrderDetailRepository;
import project.lms.service.OrderDetailService;
import project.lms.util.SecurityUtil;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

	private final OrderDetailRepository orderDetailRepository;
	private final MemberRepository memberRepository;

	@Autowired
	public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository, MemberRepository memberRepository) {
		super();
		this.orderDetailRepository = orderDetailRepository;
		this.memberRepository = memberRepository;
	}
	
	// 로그인한 사용자 정보 가져오기
    private Member getCurrentUser() {
        String username = SecurityUtil.getCurrentloginId()
                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
        
        return memberRepository.findByLoginId(username);
    }
    
    // 로그인 사용자의 주문 상세 정보 조회
	@Override
	public ResponseDto<List<OrderDetail>> getOrderDetail() {
		Member member = getCurrentUser();
		List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderMember(member);
		
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				orderDetails,
				"주문 상세 정보 조회가 성공적으로 완료되었습니다.");
	}
	
	// 전체 사용자의 주문 상세 정보 조회
	@Override
    public ResponseDto<List<OrderDetail>> getAllOrderDetails() {
        List<OrderDetail> orderDetails = orderDetailRepository.findAll();

        return new ResponseDto<>(
                ResultCode.SUCCESS.name(),
                orderDetails,
                "모든 주문 상세 정보 조회가 성공적으로 완료되었습니다.");
    }
}