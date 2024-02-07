package project.lms.service;

import project.lms.dto.OrderDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Order;

public interface OrderService {

	public ResponseDto<Order> createOrder(OrderDto orderDto);
	
}
