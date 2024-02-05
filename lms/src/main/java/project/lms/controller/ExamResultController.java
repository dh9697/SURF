package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ExamResultDto;
import project.lms.service.ExamResultService;

@RestController
@RequestMapping("/api/exam-results")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ExamResultController {

	private final ExamResultService examResultService;

	@Autowired
	public ExamResultController(ExamResultService examResultService) {
		super();
		this.examResultService = examResultService;
	}
	
	// 모든 시험 결과 조회
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
	public ResponseEntity<List<ExamResultDto>> getExamResultsList(){
		List<ExamResultDto> examResults = examResultService.getAllExamResults();
		return ResponseEntity.ok(examResults);
	}
	
	// 특정 시험 결과 조회
	@GetMapping("/list/{examResultId}")
	public ResponseEntity<ExamResultDto> getExamResult(@PathVariable Long examResultId){
		ExamResultDto examResult = examResultService.getExamResult(examResultId);
		return ResponseEntity.ok(examResult);
	}
	
	// 특정 사용자의 모든 시험 결과 조회
	@GetMapping("/list/member/{memberId}")
	public ResponseEntity<List<ExamResultDto>> getExamResultsByMember(@PathVariable Long memberId){
		List<ExamResultDto> examResults = examResultService.getExamResultsByMemberMemberId(memberId);
		return ResponseEntity.ok(examResults);
	}
	
	// 시험 결과 생성
	@PostMapping("/save/{examId}/{memberId}/{questionId}")
	public ResponseEntity<ExamResultDto> saveExamResult(@RequestBody ExamResultDto examResultDto, 
	                                                 @PathVariable Long examId, 
	                                                 @PathVariable Long memberId, 
	                                                 @PathVariable Long questionId){
	    ExamResultDto savedExamResult = examResultService.createExamResult(examResultDto, examId, memberId, questionId);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedExamResult);
	}
	
	// 시험 결과 수정
	@PutMapping("/update/{examResultId}")
	public ResponseEntity<ExamResultDto> updateExamResult(@RequestBody ExamResultDto examResultDto, @PathVariable Long examResultId){
	    ExamResultDto updatedExamResult = examResultService.updateExamResult(examResultId, examResultDto);
	    return ResponseEntity.ok(updatedExamResult);
	}

	// 시험 결과 삭제
	@DeleteMapping("/delete/{examResultId}")
	public ResponseEntity<Void> deleteExamResult(@PathVariable Long examResultId){
	    examResultService.deleteExamResult(examResultId);
	    return ResponseEntity.noContent().build();
	}
}