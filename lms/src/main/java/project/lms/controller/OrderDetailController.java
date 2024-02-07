package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ResponseDto;
import project.lms.model.OrderDetail;
import project.lms.service.OrderDetailService;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class OrderDetailController {

	private final OrderDetailService orderDetailService;

	@Autowired
	public OrderDetailController(OrderDetailService orderDetailService) {
		super();
		this.orderDetailService = orderDetailService;
	}
	
	@GetMapping
	public ResponseEntity<ResponseDto<List<OrderDetail>>> getOrderDetail() {
		ResponseDto<List<OrderDetail>> response = orderDetailService.getOrderDetail();
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/admin")
	@PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResponseDto<List<OrderDetail>>> getAllOrderDetails() {
        ResponseDto<List<OrderDetail>> response = orderDetailService.getAllOrderDetails();
        return ResponseEntity.ok(response);
    }
}