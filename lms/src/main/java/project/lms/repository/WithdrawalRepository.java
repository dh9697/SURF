package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Withdrawal;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {

}
