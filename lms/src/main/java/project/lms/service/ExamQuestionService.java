package project.lms.service;

import java.util.List;

import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;

public interface ExamQuestionService {

	public ResponseDto<ExamQuestionDto> saveExamQuestions(ExamQuestionDto examQuestionDto);
	public ResponseDto<List<ExamQuestionDto>> getExamQuestionsList();
	public ResponseDto<List<ExamQuestionDto>> getExamQuestionsForExam(Long ExamId);
}
