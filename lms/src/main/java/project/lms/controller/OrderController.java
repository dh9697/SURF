package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.OrderDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Order;
import project.lms.service.OrderService;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class OrderController {

	private final OrderService orderService;

	@Autowired
	public OrderController(OrderService orderService) {
		super();
		this.orderService = orderService;
	}
	
	@PostMapping
	public ResponseEntity<ResponseDto<Order>> createOrder(@RequestBody OrderDto orderDto) {
		ResponseDto<Order> responseDto = orderService.createOrder(orderDto);
		return ResponseEntity.ok(responseDto);
	}
	
}
