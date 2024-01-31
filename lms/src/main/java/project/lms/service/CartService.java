package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.Cart;

public interface CartService  {

	public ResponseDto<Cart> createCart(Long courseId);

}
