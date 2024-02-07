package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ExamQuestion;

public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, Long>{

	List<ExamQuestion> findByExam_ExamId(Long examId);
	
	//시험 문제 수
	Long countByExam_ExamId(Long examId);
	
	// 시험 정답안
	List<Integer> findCorrectOptionIndexByExam_ExamId(Long examId);
	
}