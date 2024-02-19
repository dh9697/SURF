package project.lms.service;

import java.util.List;

import project.lms.dto.ExamDto;
import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ExamResponseDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Exam;

public interface ExamService {
	
	public ResponseDto<List<ExamResponseDto>> getAllExams();
	
	public ResponseDto<List<ExamResponseDto>> getExamByContent(Long contentId);
	
	public ResponseDto<Exam> createExam(ExamDto examDto);
	
	public ResponseDto<ExamResponseDto> updateExam(Long examId, ExamDto examDto);
	
	public ResponseDto<String> deleteExam(Long examId);
	
	public ResponseDto<List<ExamQuestionDto>> getExamQuestions(Long examId);

}