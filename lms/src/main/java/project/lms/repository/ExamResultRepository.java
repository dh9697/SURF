package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ExamResult;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

}
