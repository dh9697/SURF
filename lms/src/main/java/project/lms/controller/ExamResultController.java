package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import project.lms.dto.ExamResultDto;
import project.lms.dto.ResponseDto;
import project.lms.service.ExamResultService;

import java.util.List;

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
	public ResponseEntity<ResponseDto<List<ExamResultDto>>> getExamResultsList(){
		return ResponseEntity.ok(examResultService.getAllExamResults());
	}
	
	// 특정 시험 결과 조회
	@GetMapping("/list/{examResultId}")
	public ResponseEntity<ResponseDto<ExamResultDto>> getExamResult(@PathVariable Long examResultId){
		return ResponseEntity.ok(examResultService.getExamResult(examResultId));
	}
	
	// 특정 시험에 대한 시험 결과의 수 조회
	@GetMapping("/count/{examId}")
	public ResponseEntity<ResponseDto<Integer>> countExamResultsByExamId(@PathVariable Long examId){
	    return ResponseEntity.ok(examResultService.countExamResultsByExamId(examId));
	}
	
	// 특정 사용자의 모든 시험 결과 조회
	@GetMapping("/list/member/{memberId}")
	public ResponseEntity<ResponseDto<List<ExamResultDto>>> getExamResultsByMember(@PathVariable Long memberId){
		return ResponseEntity.ok(examResultService.getExamResultsByMemberMemberId(memberId));
	}
	
	// 시험 결과 생성
	@PostMapping("/save/{examId}/{memberId}/{questionId}")
	public ResponseEntity<ResponseDto<ExamResultDto>> saveExamResult(@RequestBody ExamResultDto examResultDto, 
	                                                 @PathVariable Long examId, 
	                                                 @PathVariable Long memberId, 
	                                                 @PathVariable Long questionId){
	    return ResponseEntity.status(HttpStatus.CREATED).body(examResultService.createExamResult(examResultDto, examId, memberId, questionId));
	}
	
	// 시험 결과 수정
	@PutMapping("/update/{examResultId}")
	public ResponseEntity<ResponseDto<ExamResultDto>> updateExamResult(@RequestBody ExamResultDto examResultDto, @PathVariable Long examResultId){
	    return ResponseEntity.ok(examResultService.updateExamResult(examResultId, examResultDto));
	}

	// 시험 결과 삭제
	@DeleteMapping("/delete/{examResultId}")
	public ResponseEntity<ResponseDto<String>> deleteExamResult(@PathVariable Long examResultId){
	    return ResponseEntity.ok(examResultService.deleteExamResult(examResultId));
	}
}
