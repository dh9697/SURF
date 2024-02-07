package project.lms.service;

import java.util.List;

import project.lms.dto.ExamDto;
import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Exam;

public interface ExamService {
	
	public ResponseDto<List<Exam>> getAllExams();
	
	public ResponseDto<List<Exam>> getExamByContent(Long contentId);
	
	public ResponseDto<Exam> createExam(ExamDto examDto);
	
	public ResponseDto<Exam> updateExam(Long examId, ExamDto examDto);
	
	public ResponseDto<String> deleteExam(Long examId);
	
	public ResponseDto<List<ExamQuestionDto>> getExamQuestions(Long examId);

}