package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long>{

}
