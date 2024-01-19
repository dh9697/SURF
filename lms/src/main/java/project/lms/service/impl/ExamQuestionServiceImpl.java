package project.lms.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	// 모든 시험 문제 조회
	@Override
	public ResponseDto<List<ExamQuestionDto>> getExamQuestionsList(){
		List<ExamQuestion> examQuestions = examQuestionRepository.findAll();
		List<ExamQuestionDto> examQuestionDtos = examQuestions.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
		
		return new ResponseDto<>(
                ResultCode.SUCCESS.name(),
                examQuestionDtos,
                "시험 문제 목록을 조회하였습니다."
        );
	}
	
	// ExamQuestion -> ExamQuestionDto 변환 메소드
	private ExamQuestionDto convertToDto(ExamQuestion examQuestion) {
		return new ExamQuestionDto(
				examQuestion.getExam().getExamId(),
				examQuestion.getQuestionText(),
				parseOptions(examQuestion.getOptions()),
				examQuestion.getCorrectOptionIndex());
	}
	
	// JSON -> List<String> 파싱 메소드
	private List<String> parseOptions(String options){
		return Arrays.asList(options.split(","));
	}
	
	// 해당 시험 문제 조회
	@Override
	public ResponseDto<List<ExamQuestionDto>> getExamQuestionsForExam(Long examId) {
		List<ExamQuestion> examQuestions = examQuestionRepository.findByExam_ExamId(examId);
		List<ExamQuestionDto> examQuestionDtos = examQuestions.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
		
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				examQuestionDtos,
				"해당 시험 문제 목록을 조회하였습니다.");
	}
        
	@Override
	public ResponseDto<ExamQuestionDto> saveExamQuestions(ExamQuestionDto examQuestionDto){
		try {
			ExamQuestion examQuestion = new ExamQuestion();
			Exam exam = examRepository.findById(examQuestionDto.getExamId()).orElse(null);
			
			examQuestion.setExam(exam);
			examQuestion.setQuestionText(examQuestionDto.getQuestionText());
			examQuestion.setOptions(examQuestionDto.getOptionAsString());
			examQuestion.setCorrectOptionIndex(examQuestionDto.getCorrectOptionIndex());
			
			ExamQuestion savedExamQuestion = examQuestionRepository.save(examQuestion);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					examQuestionDto,
					"시험 문제를 저장하였습니다.");
			
		} catch (Exception e){
			e.printStackTrace();
			throw new InvalidRequestException("Invalid Request", "시험 문제 저장에 실패하였습니다.");
		}
	}
	
}
