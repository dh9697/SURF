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

import project.lms.dto.ExamDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Exam;
import project.lms.service.ExamService;

@RestController
@RequestMapping("/api/exam")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ExamController {

	private final ExamService examService;

	@Autowired
	public ExamController(ExamService examService) {
		super();
		this.examService = examService;
	}
	
	// 모든 시험 문제 조회
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')") // 관리자로 변경하기?
	public ResponseEntity<ResponseDto<List<Exam>>> getAllExam() {
		ResponseDto<List<Exam>> responseDto = examService.getAllExams();
		return ResponseEntity.ok(responseDto);
	}
	
	// 과목 별 시험 문제 조회
	@GetMapping("list/{contentId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<List<Exam>>> getExamByCourse(@PathVariable Long contentId) {
		ResponseDto<List<Exam>> responseDto = examService.getExamByContent(contentId);
		return ResponseEntity.ok(responseDto);
	}
	
	// 시험 등록
	@PostMapping("/save")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<Exam>> createExam(@RequestBody ExamDto examDto) {
		ResponseDto<Exam> responseDto = examService.createExam(examDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}
	
	// 시험 수정
	@PutMapping("/update/{examId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<Exam>> updateExam(@PathVariable Long examId, @RequestBody ExamDto examDto) {
		ResponseDto<Exam> responseDto = examService.updateExam(examId, examDto);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
	
	// 시험 삭제
	@DeleteMapping("/delete/{examId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<String>> deleteExam(@PathVariable Long examId) {
		ResponseDto<String> responseDto = examService.deleteExam(examId);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
}