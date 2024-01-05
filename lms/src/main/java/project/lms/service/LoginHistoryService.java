package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.LoginHistory;
import project.lms.repository.LoginHistoryRepository;

@Service
public class LoginHistoryService {

	private final LoginHistoryRepository loginHistoryRepository;

	public LoginHistoryService(LoginHistoryRepository loginHistoryRepository) {
		super();
		this.loginHistoryRepository = loginHistoryRepository;
	}
	
	public List<LoginHistory> getAllLoginHistories(){
		return loginHistoryRepository.findAll();
	}
	
	public LoginHistory createLoginHistory(LoginHistory loginHistory) {
		return loginHistoryRepository.save(loginHistory);
	}
}
