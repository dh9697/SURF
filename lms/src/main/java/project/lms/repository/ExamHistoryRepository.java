package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ExamHistory;

public interface ExamHistoryRepository extends JpaRepository<ExamHistory, Long> {

}
