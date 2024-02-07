package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ExamHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.service.ExamHistoryService;

@RestController
@RequestMapping("/api/exam-histories")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ExamHistoryController {

	private final ExamHistoryService examHistoryService;

	@Autowired
	public ExamHistoryController(ExamHistoryService examHistoryService) {
		super();
		this.examHistoryService = examHistoryService;
	}
	
	// 모든 시험 이력 조회
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN')")
	public ResponseEntity<ResponseDto<List<ExamHistoryDto>>> getExamHistoriesList(){
		ResponseDto<List<ExamHistoryDto>> responseDto = examHistoryService.getAllExamHistories();
		return ResponseEntity.ok(responseDto);
	}
	
	// 특정 시험 이력 조회
	@GetMapping("/list/{examHistoryId}")
	public ResponseEntity<ResponseDto<ExamHistoryDto>> getExamHistory(@PathVariable Long examHistoryId){
		ResponseDto<ExamHistoryDto> responseDto = examHistoryService.getExamHistory(examHistoryId);
		return ResponseEntity.ok(responseDto);
	}
	
	// 특정 회원의 시험 이력 조회
	@GetMapping("/list/member/{memberId}")
	public ResponseEntity<ResponseDto<List<ExamHistoryDto>>> getExamHistoriesByMemberId(@PathVariable Long memberId){
		ResponseDto<List<ExamHistoryDto>> responseDto = examHistoryService.getExamHistoriesByMemberId(memberId);
		return ResponseEntity.ok(responseDto);
	}

	// 시험 이력 생성
	@PostMapping("/save")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<ExamHistoryDto>> saveExamHistory(@RequestBody ExamHistoryDto examHistoryDto){
		ResponseDto<ExamHistoryDto> responseDto = examHistoryService.createExamHistory(examHistoryDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}
	
	// 특정 시험 이력 수정
	@PutMapping("/update/{examHistoryId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<ExamHistoryDto>> updateExamHistory(
			@PathVariable Long examHistoryId,
			@RequestBody ExamHistoryDto examHistoryDto) {
		ResponseDto<ExamHistoryDto> responseDto = examHistoryService.updateExamHistory(examHistoryId, examHistoryDto);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
	
	// 특정 시험 이력 삭제
	@DeleteMapping("/delete/{examHistoryId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<String>> deleteExamHistory(@PathVariable Long examHistoryId) {
		ResponseDto<String> responseDto = examHistoryService.deleteExamHistory(examHistoryId);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
}
