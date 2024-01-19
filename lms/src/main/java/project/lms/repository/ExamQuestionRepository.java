package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ExamQuestion;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long>{

	List<ExamQuestion> findByExam_ExamId(Long examId);
}
