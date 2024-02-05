package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ResponseDto;
import project.lms.model.Cart;
import project.lms.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CartController {

	private final CartService cartService;

	@Autowired
	public CartController(CartService cartService) {
		super();
		this.cartService = cartService;
	}

	@GetMapping()
	public ResponseEntity<ResponseDto<List<Cart>>> getCurrentUserCart() {
		ResponseDto<List<Cart>> response = cartService.getCurrentUserCart();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<ResponseDto<Cart>> createCart(@RequestParam Long courseId) {
		ResponseDto<Cart> response = cartService.createCart(courseId);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/{courseId}/{quantityChange}")
	public ResponseEntity<ResponseDto<Cart>> updateCart(@PathVariable Long courseId,@PathVariable int quantityChange) {
		ResponseDto<Cart> response = cartService.updateCart(courseId, quantityChange);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/{courseId}")
	public ResponseEntity<ResponseDto<String>> deleteCart(@PathVariable Long courseId) {
		ResponseDto<String> response = cartService.deleteCart(courseId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
