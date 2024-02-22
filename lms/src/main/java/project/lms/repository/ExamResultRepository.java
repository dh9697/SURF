package project.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Exam;
import project.lms.model.ExamQuestion;
import project.lms.model.ExamResult;
import project.lms.model.Member;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
	
	Optional<ExamResult> findByMemberAndExamAndExamQuestion(Member member, Exam exam, ExamQuestion examQuestion);
	
    List<ExamResult> findByMemberMemberId(Long memberId);

    int countByMemberAndExam(Member member, Exam exam);
    
}
