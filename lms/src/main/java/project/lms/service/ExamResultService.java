package project.lms.service;

import java.util.List;

import project.lms.dto.ExamResultDto;
import project.lms.dto.ResponseDto;

public interface ExamResultService {

    ResponseDto<List<ExamResultDto>> getAllExamResults();

    ResponseDto<ExamResultDto> getExamResult(Long examResultId);
    
    ResponseDto<List<ExamResultDto>> getExamResultsByMemberMemberId(Long memberId);

    ResponseDto<ExamResultDto> createExamResult(ExamResultDto examResultDto, Long examId, Long memberId, Long questionId);

    ResponseDto<ExamResultDto> updateExamResult(Long examResultId, ExamResultDto examResultDto);

    ResponseDto<String> deleteExamResult(Long examResultId);

    ResponseDto<String> checkAnswer(Long examResultId, Long questionId);

    ResponseDto<Integer> countExamResultsByExamId(Long examId);
    
}
