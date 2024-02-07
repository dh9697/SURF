package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.lms.dto.ResponseDto;
import project.lms.dto.WithdrawalDto;
import project.lms.service.WithdrawalService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class WithdrawalController {

	private final WithdrawalService withdrawalService;

	@Autowired
	public WithdrawalController(WithdrawalService withdrawalService) {
		super();
		this.withdrawalService = withdrawalService;
	}
	
	@PostMapping("/withdrawal")
	public ResponseEntity<ResponseDto<WithdrawalDto>> withdrawal(@RequestBody @Valid WithdrawalDto withdrawalDto) {
		ResponseDto<WithdrawalDto> responseDto = withdrawalService.withdrawal(withdrawalDto);
		return ResponseEntity.ok(responseDto);
	}

}