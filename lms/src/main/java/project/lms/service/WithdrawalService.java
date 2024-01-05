package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Withdrawal;
import project.lms.repository.WithdrawalRepository;

@Service
public class WithdrawalService {

	private final WithdrawalRepository withdrawalRepository;

	public WithdrawalService(WithdrawalRepository withdrawalRepository) {
		super();
		this.withdrawalRepository = withdrawalRepository;
	}
	
	public List<Withdrawal> getAllWithdrawals(){
		return withdrawalRepository.findAll();
	}
	
	public Withdrawal createWithdrawal(Withdrawal withdrawal) {
		return withdrawalRepository.save(withdrawal);
	}
}
