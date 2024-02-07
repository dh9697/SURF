package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ExamResult;

public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {
	
    List<ExamResult> findByMemberMemberId(Long memberId);
    
    int countByExam_ExamId(Long examId);
    
}
