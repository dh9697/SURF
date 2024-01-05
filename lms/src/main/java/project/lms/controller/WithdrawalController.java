package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.Withdrawal;
import project.lms.service.WithdrawalService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class WithdrawalController {

	private WithdrawalService withdrawalService;

	@Autowired
	public WithdrawalController(WithdrawalService withdrawalService) {
		super();
		this.withdrawalService = withdrawalService;
	}
	
	@GetMapping("/withdrawal")
	public List<Withdrawal> getAllWithdrawals(){
		return withdrawalService.getAllWithdrawals();
	}
	
	@PostMapping("/withdrawal")
	public Withdrawal createWithdrawal(@RequestBody Withdrawal withdrawal) {
		return withdrawalService.createWithdrawal(withdrawal);
	}
	
}
