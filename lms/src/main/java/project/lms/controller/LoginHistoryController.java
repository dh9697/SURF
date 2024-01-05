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

import project.lms.model.LoginHistory;
import project.lms.service.LoginHistoryService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class LoginHistoryController {

	private final LoginHistoryService loginHistoryService;

	@Autowired
	public LoginHistoryController(LoginHistoryService loginHistoryService) {
		super();
		this.loginHistoryService = loginHistoryService;
	}
	
	@GetMapping("/loginhistory")
	public List<LoginHistory> getAllLoginHistories(){
		return loginHistoryService.getAllLoginHistories();
	}
	
	@PostMapping("/loginhistory")
	public LoginHistory createLoginHistory(@RequestBody LoginHistory loginHistory) {
		return loginHistoryService.createLoginHistory(loginHistory);
	}
}
