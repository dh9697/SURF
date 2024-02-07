package project.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ExamDto;
import project.lms.dto.ExamHistoryDto;
import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.model.Exam;
import project.lms.model.ExamHistory;
import project.lms.model.ExamQuestion;
import project.lms.model.Member;
import project.lms.repository.ContentRepository;
import project.lms.repository.ExamHistoryRepository;
import project.lms.repository.ExamRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.ExamService;

@Service
public class ExamServiceImpl implements ExamService {

	private ExamRepository examRepository;
	private MemberRepository memberRepository;
	private ContentRepository contentRepository;
	private ExamHistoryRepository examHistoryRepository;

	@Autowired
	public ExamServiceImpl(ExamRepository examRepository, MemberRepository memberRepository, ContentRepository contentRepository, ExamHistoryRepository examHistoryRepository) {
		super();
		this.examRepository = examRepository;
		this.memberRepository = memberRepository;
		this.contentRepository = contentRepository;
		this.examHistoryRepository = examHistoryRepository;
	}
	
	// 시험 전체 조회 - 각 course의 선생님 권한
	@Override
	public ResponseDto<List<Exam>> getAllExams() {
		List<Exam> exams = examRepository.findAll();
		
		if(exams == null || exams.isEmpty()) {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"시험이 존재하지 않습니다.");
		} else {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exams,
					"시험 목록을 조회하였습니다.");
		}
	}
	
	// 시험 문제 조회
	@Override
	public ResponseDto<List<ExamQuestionDto>> getExamQuestions(Long examId) {
	    // examId를 이용하여 Exam 객체를 조회
	    Exam exam = examRepository.findById(examId)
	        .orElseThrow(() -> new InvalidRequestException("Exam not found", "해당 시험을 찾을 수 없습니다."));

	    // Exam 객체에서 문제 목록을 가져온다.
	    List<ExamQuestion> examQuestions = exam.getExamQuestions();

	    // ExamQuestion 객체들을 ExamQuestionDto로 변환
	    List<ExamQuestionDto> examQuestionDtos = examQuestions.stream()
	        .map(examQuestion -> toDto(examQuestion))
	        .collect(Collectors.toList());

	    // 변환된 ExamQuestionDto 리스트를 반환
	    return new ResponseDto<>("SUCCESS", examQuestionDtos, "Exam questions retrieved successfully");
	}

	// ExamQuestion 객체를 ExamQuestionDto로 변환하는 메서드
	private ExamQuestionDto toDto(ExamQuestion examQuestion) {
	    return ExamQuestionDto.from(examQuestion);
	}


	// 컨텐츠에 따라 시험 목록 
	@Override
	public ResponseDto<List<Exam>> getExamByContent(Long contentId) {
		List<Exam> exams = examRepository.findByContentContentId(contentId);
			if (exams == null || exams.isEmpty()) {
				return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"해당 컨텐츠에 대한 시험이 없습니다.");
			} else {
				return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exams,
					"컨텐츠별 시험 목록을 조회하였습니다.");
			}
	}
	
	// 컨텐츠에 따라 시험 생성 
	@Transactional
	@Override
	public ResponseDto<Exam> createExam(ExamDto examDto) {
		try {
			Content content = contentRepository.findById(examDto.getContentId())
		            .orElseThrow(() -> new InvalidRequestException("Invalid Request", "컨텐츠가 존재하지 않거나 찾을 수 없습니다."));
			Exam exam = new Exam();
			exam.setContent(content);
			exam.setExamIsActive(examDto.getExamIsActive());
			
			examRepository.save(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exam,
					"시험을 등록 하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"시험 등록에 실패하였습니다.");
		}
	}
	
	// 시험 수정
	@Transactional
	@Override
	public ResponseDto<Exam> updateExam(Long examId, ExamDto examDto) {
		try {
			Exam exam = examRepository.findById(examId)
					.orElseThrow(() -> new InvalidRequestException("Invalid Request", "해당 시험이 존재하지 않거나 찾을 수 없습니다."));
		
			exam.setExamIsActive(examDto.getExamIsActive());
			
			examRepository.save(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exam,
					"시험을 수정하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
	        return new ResponseDto<>(
	                ResultCode.ERROR.name(),
	                null,
	                "시험 수정에 실패하였습니다.");
		}
	}
	
	// 시험 삭제
	@Transactional
	@Override
	public ResponseDto<String> deleteExam(Long examId) {
		try {
			Exam exam = examRepository.findById(examId)
					.orElseThrow(() -> new InvalidRequestException("Invalid Request", "해당 시험이 존재하지 않거나 찾을 수 없습니다."));
			
			examRepository.delete(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"시험을 삭제하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"시험 삭제에 실패하였습니다.");
		}
	}

}