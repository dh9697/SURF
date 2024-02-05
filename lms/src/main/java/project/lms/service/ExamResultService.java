package project.lms.service;

import java.util.List;

import project.lms.dto.ExamResultDto;

public interface ExamResultService {

    List<ExamResultDto> getAllExamResults();

    ExamResultDto getExamResult(Long examResultId);
    
    List<ExamResultDto> getExamResultsByMemberMemberId(Long memberId);

    ExamResultDto createExamResult(ExamResultDto examResultDto, Long examId, Long memberId, Long questionId);

    ExamResultDto updateExamResult(Long examResultId, ExamResultDto examResultDto);

    void deleteExamResult(Long examResultId);

    void checkAnswer(Long examResultId, Long questionId);
    
}