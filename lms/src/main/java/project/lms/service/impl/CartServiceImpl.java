package project.lms.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Cart;
import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.repository.CartRepository;
import project.lms.repository.CourseRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.CartService;
import project.lms.util.SecurityUtil;

@Service
public class CartServiceImpl implements CartService{

	private final CartRepository cartRepository;
	private final MemberRepository memberRepository;
	private final CourseRepository courseRepository;
	
	@Autowired
	public CartServiceImpl(CartRepository cartRepository, MemberRepository memberRepository, CourseRepository courseRepository) {
		super();
		this.cartRepository = cartRepository;
		this.memberRepository = memberRepository;
		this.courseRepository = courseRepository;
	}

	// 로그인한 사용자 정보 가져오기
    private Member getCurrentUser() {
        String username = SecurityUtil.getCurrentloginId()
                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
        
        return memberRepository.findByLoginId(username);
    }
    
	// 로그인 유저의 장바구니 조회
	@Transactional(readOnly = true)
	public ResponseDto<List<Cart>> getCurrentUserCart() {
		Member member = getCurrentUser();
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
		List<Cart> carts = cartRepository.findAllByMember(member);
		
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				carts,
				"현재 사용자의 장바구니를 조회했습니다.");
	}
	
	// 로그인 유저의 장바구니 생성
	@Transactional
	public ResponseDto<Cart> createCart(Long courseId) {
		Member member = getCurrentUser();
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
		Course course = courseRepository.findById(courseId)
			    .orElseThrow(() -> new InvalidRequestException("not found courseId", "해당 강좌를 찾을 수 없습니다."));
		
		Cart cart = cartRepository.findByMemberAndCourse(member, course);
	    if (cart == null) {
	        cart = new Cart();
	        cart.setMember(member);
	        cart.setCourse(course);
	        cart.setTotalQuantity(1);
	        cart.setTotalPrice(course.getPrice());
	        cart.setCreateDate(LocalDateTime.now());
	    } else {
	    	cart.setTotalQuantity(cart.getTotalQuantity() +1);
	    	cart.setTotalPrice(cart.getTotalPrice() + course.getPrice());
	    }
		
	    cartRepository.save(cart);
	    
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				cart,
				"장바구니가 추가되었습니다.");
	}
	
	// 장바구니 수량 업데이트
	@Transactional
	public ResponseDto<Cart> updateCart(Long courseId, int quantityChange) {
		Member member = getCurrentUser();
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
		Course course = courseRepository.findById(courseId)
			    .orElseThrow(() -> new InvalidRequestException("not found courseId", "해당 강좌를 찾을 수 없습니다."));
		
		Cart cart = cartRepository.findByMemberAndCourse(member, course);
	    if (cart == null) {
	    	throw new InvalidRequestException("not found course in cart", "장바구니에 해당 강좌가 없습니다.");
	    }
	    
	    int newQuantity = cart.getTotalQuantity() + quantityChange;
	    if (newQuantity < 0) {
	        throw new InvalidRequestException("quantity less than zero", "수량은 0 미만이 될 수 없습니다.");
	    }

	    if (newQuantity == 0) {
	        cartRepository.delete(cart);
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                null,
	                "장바구니에서 해당 강좌가 제거되었습니다.");
	    } else {
	        cart.setTotalQuantity(newQuantity);
	        cart.setTotalPrice(newQuantity * course.getPrice());
	        cartRepository.save(cart);
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                cart,
	                "수량이 " + (quantityChange >= 0 ? "증가" : "감소") + "되었습니다.");
	    }
	}
	
	// 장바구니 코스 삭제
	@Transactional
	public ResponseDto<String> deleteCart(Long courseId) {
		Member member = getCurrentUser();
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
	    Course course = courseRepository.findById(courseId)
	            .orElseThrow(() -> new InvalidRequestException("not found courseId", "해당 강좌를 찾을 수 없습니다."));

	    Cart cart = cartRepository.findByMemberAndCourse(member, course);
	    if (cart == null) {
	        throw new InvalidRequestException("not found course in cart", "장바구니에 해당 강좌가 없습니다.");
	    }
	    
	    cartRepository.delete(cart);

	    return new ResponseDto<>(
	            ResultCode.SUCCESS.name(),
	            null,
	            "장바구니에서 강좌가 삭제되었습니다.");
	}
	
}
