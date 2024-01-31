package project.lms.service.impl;

import java.time.LocalDateTime;

import javax.management.relation.InvalidRelationIdException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
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

	@Transactional
	public ResponseDto<Cart> createCart(Long courseId) {
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = user.getUsername();
		
		Member member = memberRepository.findByLoginId(username);
		if(member == null) {
			throw new InvalidRequestException("not found username", "해당 사용자를 찾을 수 없습니다.");
		}
		
		Course course = courseRepository.findById(courseId)
			    .orElseThrow(() -> new InvalidRequestException("not found courseId", "해당 강좌를 찾을 수 없습니다."));
		
		Cart cart = cartRepository.findByMember(member);
	    if (cart == null) {
	        cart = new Cart();
	        cart.setMember(member);
	        cart.setCourse(course);
	        cart.setTotalQuantity(1);
	        cart.setTotalPrice(course.getPrice());
	        cart.setCreateDate(LocalDateTime.now());
	        cartRepository.save(cart);
	    } else {
	    	cart.setCourse(course);
	    	cart.setTotalQuantity(cart.getTotalQuantity() +1);
	    	cart.setTotalPrice(cart.getTotalPrice() + course.getPrice());
	    }
		
	    cartRepository.save(cart);
	    
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				cart,
				"장바구니가 추가되었습니다.");
	}
	
}
