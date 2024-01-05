package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.LoginHistory;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {

}
