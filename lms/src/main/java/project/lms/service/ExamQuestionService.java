package project.lms.service;

import java.util.List;

import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;
import project.lms.model.ExamQuestion;

public interface ExamQuestionService {

	public ResponseDto<ExamQuestionDto> saveExamQuestions(ExamQuestionDto examQuestionDto);
	public ResponseDto<List<ExamQuestion>> getAllExamQuestions();
	public ResponseDto<List<ExamQuestion>> getExamQuestionsForExam(Long examId);
	public ResponseDto<ExamQuestionDto> updateExamQuestions(Long examQuestionId, ExamQuestionDto examQuestionDto);
	public ResponseDto<String> deleteExamQuestions(Long examQuestionId);
}
