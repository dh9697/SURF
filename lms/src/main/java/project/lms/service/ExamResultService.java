package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.dto.ExamResultDto;
import project.lms.dto.ResponseDto;
import project.lms.model.ExamResult;
import project.lms.repository.ExamResultRepository;

public interface ExamResultService {

	ResponseDto<List<ExamResult>> getAllExamResults();
    ResponseDto<ExamResult> getExamResult(Long examResultId);
    ResponseDto<ExamResult> createExamResult(ExamResultDto examResultDto, Long examId, Long memberId, Long questionId);
    void checkAnswer(ExamResult examResult, Long questionId);
}
