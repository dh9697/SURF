package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ResponseDto;
import project.lms.model.Cart;
import project.lms.service.CartService;
import project.lms.service.MemberService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CartController {

	private final CartService cartService;
	private final MemberService memberService;

	@Autowired
	public CartController(CartService cartService, MemberService memberService) {
		super();
		this.cartService = cartService;
		this.memberService = memberService;
	}

	@PostMapping()
	public ResponseEntity<ResponseDto<Cart>> createCart(@RequestParam Long courseId) {
		ResponseDto<Cart> response = cartService.createCart(courseId);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
}
