package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.OrderDetail;

public interface OrderDetailService {

	public ResponseDto<List<OrderDetail>> getOrderDetail();
	
	public ResponseDto<List<OrderDetail>> getAllOrderDetails();
	
}