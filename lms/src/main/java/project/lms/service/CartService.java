package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Cart;

public interface CartService  {

	public ResponseDto<List<Cart>> getCurrentUserCart();
	
	public ResponseDto<Cart> createCart(Long courseId);
	
	public ResponseDto<Cart> updateCart(Long courseId, int quantityChange);
	
	public ResponseDto<String> deleteCart(Long courseId);

}
