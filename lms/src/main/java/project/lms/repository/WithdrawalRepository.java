package project.lms.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {
	
	List<Withdrawal> findByIsDeletedFalseAndWithdrawalTimeBefore(LocalDateTime dateTime);
	
}