package project.lms.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.OrderDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Authority;
import project.lms.model.Cart;
import project.lms.model.CourseHistory;
import project.lms.model.Member;
import project.lms.model.Order;
import project.lms.model.OrderDetail;
import project.lms.repository.AuthorityRepository;
import project.lms.repository.CartRepository;
import project.lms.repository.CourseHistoryRepository;
import project.lms.repository.MemberRepository;
import project.lms.repository.OrderDetailRepository;
import project.lms.repository.OrderRepository;
import project.lms.service.OrderService;
import project.lms.util.SecurityUtil;

@Service
public class OrderServiceImpl implements OrderService{

	private OrderRepository orderRepository;
	private MemberRepository memberRepository;
	private CartRepository cartRepository;
	private OrderDetailRepository orderDetailRepository;
	private AuthorityRepository authorityRepository;
	private final CourseHistoryRepository courseHistoryRepository; 

	@Autowired
	public OrderServiceImpl(OrderRepository orderRepository, MemberRepository memberRepository
			, CartRepository cartRepository, OrderDetailRepository orderDetailRepository,
			AuthorityRepository authorityRepository, CourseHistoryRepository courseHistoryRepository) {
		super();
		this.orderRepository = orderRepository;
		this.memberRepository = memberRepository;
		this.cartRepository = cartRepository;
		this.orderDetailRepository = orderDetailRepository;
		this.authorityRepository = authorityRepository;
		this.courseHistoryRepository = courseHistoryRepository;
	}
	
	// 로그인한 사용자 정보 가져오기
    private Member getCurrentUser() {
        String username = SecurityUtil.getCurrentloginId()
                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
        
        return memberRepository.findByLoginId(username);
    }
    
	@Transactional
	public ResponseDto<Order> createOrder(OrderDto orderDto) {
		Member member = getCurrentUser();
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
		List<Cart> carts = cartRepository.findAllByMember(member);
		if(carts.isEmpty()) {
			throw new InvalidRequestException("empty cart", "장바구니가 비어있습니다.");
		}
		
		Order order = new Order();
		order.setMember(member);
		order.setOrderDate(LocalDateTime.now());
		order.setRecipient(orderDto.getRecipient());
		order.setAddress(orderDto.getAddress());
		order.setPhoneNum(orderDto.getPhoneNum());
		order.setEmail(orderDto.getEmail());
		order.setDeliveryMessage(orderDto.getDeliveryMessage());
		order.setPaymentMethod(orderDto.getPaymentMethod());
		order.setPaymentStatus(false);
		
		orderRepository.save(order);
		
		BigDecimal totalAmount = BigDecimal.ZERO;
		for (Cart cart : carts) {
	        OrderDetail detail = new OrderDetail();
	        detail.setOrder(order);
	        detail.setCourse(cart.getCourse());
	        detail.setQuantity(cart.getTotalQuantity());
	        detail.setPrice(BigDecimal.valueOf(cart.getTotalPrice()));
	        detail.setExpirationDateFromNow();
	        orderDetailRepository.save(detail);
	        totalAmount = totalAmount.add(BigDecimal.valueOf(cart.getTotalPrice()));
	        
	        CourseHistory courseHistory = new CourseHistory();
            courseHistory.setMember(member);
            courseHistory.setCourse(cart.getCourse());
            courseHistory.setStartDate(LocalDateTime.now());
            courseHistory.setEndDate(detail.getExpirationDate());
            courseHistoryRepository.save(courseHistory);
	    }
	    order.setTotalAmount(totalAmount);
	    
	    // 가상 결제 서비스
	    boolean paymentResult = true;
	    
	    if(paymentResult) {
	    	// 가상 결제 성공
	    	order.setPaymentStatus(true);
	    	order.setPaymentDate(LocalDateTime.now());
	    	order.setStatus("결제 완료");
	    	
	    	Authority authority = authorityRepository.findByAuthorityName("ROLE_MEMBER");
	        if(authority == null) {
	            throw new InvalidRequestException("not found authorityName", "ROLE_MEMBER 권한을 찾을 수 없습니다.");
	        }
	        member.getAuthorities().add(authority);
	        memberRepository.save(member);
			
	    } else {
	    	// 가상 결제 실패 
	    	order.setStatus("결제 실패");
	    }
	    
	    orderRepository.save(order);
	    cartRepository.deleteAll(carts);
	    
	    return new ResponseDto<>(
	    		ResultCode.SUCCESS.name(),
	    		order,
	    		"주문이 성공적으로 완료되었습니다.");
	}
}
