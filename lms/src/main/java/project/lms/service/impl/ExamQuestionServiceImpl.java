package project.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Exam;
import project.lms.model.ExamQuestion;
import project.lms.repository.ExamQuestionRepository;
import project.lms.repository.ExamRepository;
import project.lms.service.ExamQuestionService;

@Service
public class ExamQuestionServiceImpl implements ExamQuestionService{

	private ExamQuestionRepository examQuestionRepository;
	private ExamRepository examRepository;

	@Autowired
	public ExamQuestionServiceImpl(ExamQuestionRepository examQuestionRepository, ExamRepository examRepository) {
		super();
		this.examQuestionRepository = examQuestionRepository;
		this.examRepository = examRepository;
	}

	@Override
	public ResponseDto<List<ExamQuestionDto>> getAllExamQuestions(){
		List<ExamQuestion> examQuestions = examQuestionRepository.findAll();
		
		if(examQuestions == null || examQuestions.isEmpty()) {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"시험 문제가 존재하지 않습니다.");
		} else {
			List<ExamQuestionDto> examQuestionDtos = examQuestions.stream()
					.map(ExamQuestionDto::from)
					.collect(Collectors.toList());
		return new ResponseDto<>(
                ResultCode.SUCCESS.name(),
                examQuestionDtos,
                "시험 문제 목록을 조회하였습니다.");
		}
	}
	
	@Override
	public ResponseDto<List<ExamQuestionDto>> getExamQuestionsForExam(Long examId) {
		List<ExamQuestion> examQuestions = examQuestionRepository.findByExam_ExamId(examId);
		
		if (examQuestions == null || examQuestions.isEmpty()) {
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                null,
	                "해당 시험에 대한 문제가 없습니다.");
	    } else {
	    	List<ExamQuestionDto> examQuestionDtos = examQuestions.stream()
	    			.map(ExamQuestionDto::from)
	    			.collect(Collectors.toList());
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                examQuestionDtos,
	                "해당 시험 문제 목록을 조회하였습니다.");
	    }
	}
			
	@Transactional
	@Override
	public ResponseDto<ExamQuestionDto> saveExamQuestions(ExamQuestionDto examQuestionDto){
		try {
			if (examQuestionDto.getExamId() == null) {
	            throw new InvalidRequestException("Invalid Request", "시험 ID가 제공되지 않았습니다.");
	        }

			ExamQuestion examQuestion = new ExamQuestion();
			Exam exam = examRepository.findById(examQuestionDto.getExamId())
		            .orElseThrow(() -> new InvalidRequestException("Invalid Request", "시험을 찾을 수 없습니다."));
	
			examQuestion.setExam(exam);
			examQuestion.setQuestParagraph(examQuestionDto.getQuestParagraph());
			examQuestion.setQuestionText(examQuestionDto.getQuestionText());
			examQuestion.setOptions(examQuestionDto.getOptions());
			examQuestion.setCorrectOptionIndex(examQuestionDto.getCorrectOptionIndex());
			examQuestion.setWrongAnsExpl(examQuestionDto.getWrongAnsExpl());
			
			ExamQuestion savedExamQuestion = examQuestionRepository.save(examQuestion);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					ExamQuestionDto.from(savedExamQuestion),
					"시험 문제를 저장하였습니다.");
			
		} catch (Exception e){
			e.printStackTrace();
			throw new InvalidRequestException("Invalid Request", "시험 문제 저장에 실패하였습니다.");
		}
	}
	
	@Transactional
	@Override
	public ResponseDto<ExamQuestionDto> updateExamQuestions(Long examQuestionId, ExamQuestionDto examQuestionDto) {
	    try {
	        ExamQuestion examQuestion = examQuestionRepository.findById(examQuestionId)
	                .orElseThrow(() -> new InvalidRequestException("Exam question not found", "해당 시험 문제를 찾을 수 없습니다."));

	        examQuestion.setExam(examRepository.findById(examQuestionDto.getExamId())
	        		.orElseThrow(() -> new InvalidRequestException("Exam not found", "시험을 찾을 수 없습니다.")));
	        examQuestion.setQuestParagraph(examQuestionDto.getQuestParagraph());
	        examQuestion.setQuestionText(examQuestionDto.getQuestionText());
	        examQuestion.setOptions(examQuestionDto.getOptions());
	        examQuestion.setCorrectOptionIndex(examQuestionDto.getCorrectOptionIndex());
	        examQuestion.setWrongAnsExpl(examQuestionDto.getWrongAnsExpl());
	        
	        ExamQuestion updatedQuestion = examQuestionRepository.save(examQuestion);

	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                ExamQuestionDto.from(updatedQuestion),
	                "시험 문제를 업데이트하였습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new InvalidRequestException("Invalid Request", "시험 문제 업데이트에 실패하였습니다.");
	    }
	}
	
	@Transactional
	@Override
	public ResponseDto<String> deleteExamQuestions(Long examQuestionId) {
	    try {
	        examQuestionRepository.deleteById(examQuestionId);
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                null,
	                "시험 문제를 삭제하였습니다.");
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new InvalidRequestException("Invalid Request", "시험 문제 삭제에 실패하였습니다.");
	    }
	}
}
