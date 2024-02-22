package project.lms.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lms.dto.ExamDto;
import project.lms.dto.ExamResultDto;
import project.lms.dto.MemberDto;
import project.lms.dto.ResponseDto;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Exam;
import project.lms.model.ExamHistory;
import project.lms.model.ExamQuestion;
import project.lms.model.ExamResult;
import project.lms.model.Member;
import project.lms.repository.ExamHistoryRepository;
import project.lms.repository.ExamQuestionRepository;
import project.lms.repository.ExamRepository;
import project.lms.repository.ExamResultRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.ExamResultService;

@Service
public class ExamResultServiceImpl implements ExamResultService {

	@Autowired
	private final ExamResultRepository examResultRepository;

	@Autowired
	private final ExamQuestionRepository examQuestionRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private ExamRepository examRepository;
	
	@Autowired
	private ExamHistoryRepository examHistoryRepository;


	public ExamResultServiceImpl(ExamResultRepository examResultRepository, ExamQuestionRepository examQuestionRepository, MemberRepository memberRepository, ExamRepository examRepository, ExamHistoryRepository examHistoryRepository) {
	    super();
	    this.examResultRepository = examResultRepository;
	    this.examQuestionRepository = examQuestionRepository;
	    this.memberRepository = memberRepository;
	    this.examRepository = examRepository;
	    this.examHistoryRepository = examHistoryRepository;
	}
	
	// 모든 시험 조회
	@Override
	public ResponseDto<List<ExamResultDto>> getAllExamResults(){
		List<ExamResultDto> result = examResultRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
		return new ResponseDto<>("SUCCESS", result, "All exam results retrieved successfully");
	}
	
	// 해당 시험 결과 조회
	@Override
	public ResponseDto<ExamResultDto> getExamResult(Long examResultId) {
		ExamResultDto result = toDto(examResultRepository.findById(examResultId)
				.orElseThrow(() -> new InvalidRequestException("ExamResult not found", "해당 시험 결과를 찾을 수 없습니다.")));
		return new ResponseDto<>("SUCCESS", result, "Exam result retrieved successfully");
	}

	// memberId를 기반으로 해당 사용자의 모든 시험 결과를 조회
	@Override
	public ResponseDto<List<ExamResultDto>> getExamResultsByMemberMemberId(Long memberId) {
		 List<ExamResultDto> result = examResultRepository.findByMemberMemberId(memberId).stream().map(this::toDto).collect(Collectors.toList());
		 return new ResponseDto<>("SUCCESS", result, "Exam results for member retrieved successfully");
	}

	// 시험 결과를 생성하고, 저장
	@Override
	public ResponseDto<ExamResultDto> createExamResult(ExamResultDto examResultDto, Long examId, Long memberId, Long questionId) {
	    Member member = memberRepository.findById(memberId)
	            .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
	    Exam exam = examRepository.findById(examId)
	            .orElseThrow(() -> new InvalidRequestException("Exam not found", "해당 시험을 찾을 수 없습니다."));
	    ExamQuestion examQuestion = examQuestionRepository.findById(questionId)
	            .orElseThrow(() -> new InvalidRequestException("ExamQuestion not found", "해당 시험 문제를 찾을 수 없습니다."));
	    
	    Optional<ExamResult> existingExamResult = examResultRepository.findByMemberAndExamAndExamQuestion(member, exam, examQuestion);
	    if(existingExamResult.isPresent()) {
	    	throw new InvalidRequestException("Duplicate exam result", "이미 저장된 시험 결과입니다.");
	    }
	    
	    ExamHistory examHistory = examHistoryRepository.findByMember_MemberIdAndExam_ExamId(memberId, examId)
	            .orElseGet(() -> {
	                ExamHistory newExamHistory = new ExamHistory();
	                newExamHistory.setMember(member);
	                newExamHistory.setExam(exam);
	                newExamHistory.setExamCompletionStatus(false);  // 초기 상태는 '미완료'
	                return examHistoryRepository.save(newExamHistory);
	            });

	    // ExamResultDto에서 받아온 데이터를 ExamResult에 설정
	    ExamResult examResult = new ExamResult();
	    examResult.setMember(member);
	    examResult.setExam(exam);
	    examResult.setSubmittedAnswer(examResultDto.getSubmittedAnswer());
	    examResult.setExamQuestion(examQuestion);

	    examResult = examResultRepository.save(examResult);

	    // 사용자가 제출한 답안이 정답인지 확인
	    checkAnswer(examResult.getExamResultId(), questionId);

	    // 시험 문제를 다 풀었다면 history 수정
	    int totalQuestions = exam.getExamQuestions().size();
	    int totalResults = examResultRepository.countByMemberAndExam(member, exam);

	    if (totalQuestions == totalResults) {
	        examHistory.setExamCompletionStatus(true);
	        examHistoryRepository.save(examHistory);  
	    }

	    return new ResponseDto<>("SUCCESS", toDto(examResult), "Exam result created successfully");
	}

	// 제출한 답안이 맞는지 확인하고, 결과를 ResponseDto<String>로 반환하는 메서드
	@Override
	public ResponseDto<String> checkAnswer(Long examResultId, Long questionId) {
		ExamResult examResult = examResultRepository.findById(examResultId)
		        .orElseThrow(() -> new InvalidRequestException("ExamResult not found", "해당 시험 결과를 찾을 수 없습니다."));

		ExamQuestion examQuestion = examQuestionRepository.findById(questionId)
		        .orElseThrow(() -> new InvalidRequestException("ExamQuestion not found", "해당 시험 문제를 찾을 수 없습니다."));
	    
	    // 제출한 답안이 정답인지 확인
		if (examQuestion.getCorrectOptionIndex().equals(examResult.getSubmittedAnswer())) {
	        examResult.setCorrect(true);
	    } else {
	        examResult.setCorrect(false);
	    }
	    
		examResultRepository.save(examResult);
	    return new ResponseDto<>("SUCCESS", "Answer checked successfully", null);
	}


	// ExamResult 엔티티를 ExamResultDto로 변환하는 메서드
	private ExamResultDto toDto(ExamResult examResult) {
		ExamQuestion examQuestion = examQuestionRepository.findById(examResult.getExamQuestion().getExamQuestionId())
				.orElseThrow(() -> new InvalidRequestException("ExamQuestion not found", "해당 시험 문제를 찾을 수 없습니다."));
		ExamResultDto examResultDto = new ExamResultDto();
		examResultDto.setExamResultId(examResult.getExamResultId());  
		Member member = examResult.getMember();
		MemberDto memberDto = MemberDto.from(member);
	    examResultDto.setMember(memberDto);
	    Exam exam = examResult.getExam();
		ExamDto examDto = ExamDto.from(exam);
	    examResultDto.setExam(examDto);
	    examResultDto.setExamQuestionId(examResult.getExamQuestion().getExamQuestionId());
	    examResultDto.setSubmittedAnswer(examResult.getSubmittedAnswer());
	    examResultDto.setIsCorrect(examResult.isCorrect());
	    examResultDto.setCorrectOptionIndex(examQuestion.getCorrectOptionIndex() != null ? examQuestion.getCorrectOptionIndex().intValue() : 0);
	    examResultDto.setWrongAnsExpl(examQuestion.getWrongAnsExpl());   
		    return examResultDto;
	}
	
	// examResultId를 기반으로 ExamResult 객체를 조회하고, ExamResultDto에서 받아온 데이터를 ExamResult에 설정하고, 사용자가 제출한 답안이 정답인지 확인하고, 결과를 ResponseDto<ExamResultDto>로 반환하는 메서드
	@Override
	public ResponseDto<ExamResultDto> updateExamResult(Long examResultId, ExamResultDto examResultDto) {
		// examResultId를 기반으로 ExamResult 객체를 조회
		ExamResult examResult = examResultRepository.findById(examResultId)
		        .orElseThrow(() -> new InvalidRequestException("ExamResult not found", "해당 시험 결과를 찾을 수 없습니다."));

		// ExamResultDto에서 받아온 데이터를 ExamResult에 설정
		examResult.setSubmittedAnswer(examResultDto.getSubmittedAnswer());

		// 사용자가 제출한 답안이 정답인지 확인
	    checkAnswer(examResultId, examResult.getExamQuestion().getExamQuestionId());   
	    
	    // ExamResult 객체를 업데이트
	    examResult = examResultRepository.save(examResult);

	    // 업데이트된 결과를 ExamResultDto로 변환하여 반환
	    return new ResponseDto<>("SUCCESS", toDto(examResult), "Exam result updated successfully");
	}
	
	// 삭제
	@Override
	public ResponseDto<String> deleteExamResult(Long examResultId) {
		ExamResult examResult = examResultRepository.findById(examResultId)
		        .orElseThrow(() -> new InvalidRequestException("ExamResult not found", "해당 시험 결과를 찾을 수 없습니다."));
	    
		examResultRepository.delete(examResult);
	    return new ResponseDto<>("SUCCESS", "ExamResult deleted successfully", null);
	}

}