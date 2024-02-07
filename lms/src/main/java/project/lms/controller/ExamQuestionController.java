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

import project.lms.dto.ExamQuestionDto;
import project.lms.dto.ResponseDto;
import project.lms.service.ExamQuestionService;

@RestController
@RequestMapping("/api/exam-questions")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ExamQuestionController {

	private final ExamQuestionService examQuestionService;

	@Autowired
	public ExamQuestionController(ExamQuestionService examQuestionService) {
		super();
		this.examQuestionService = examQuestionService;
	}
	
	// 모든 시험 문제 조회
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<List<ExamQuestionDto>>> getExamQuestionsList(){
		ResponseDto<List<ExamQuestionDto>> responseDto = examQuestionService.getAllExamQuestions();
		return ResponseEntity.ok(responseDto);
	}
	
	// 특정 시험 문제 조회
	@GetMapping("/list/{examId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<List<ExamQuestionDto>>> getExamQuestionsForExam(@PathVariable Long examId){
		ResponseDto<List<ExamQuestionDto>> responseDto = examQuestionService.getExamQuestionsForExam(examId);
		return ResponseEntity.ok(responseDto);
	}

	// 시험 문제 저장
	@PostMapping("/save")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<ExamQuestionDto>> saveExamQuestions(@RequestBody ExamQuestionDto examQuestionDto){
		ResponseDto<ExamQuestionDto> responseDto = examQuestionService.saveExamQuestions(examQuestionDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}
	
	// 시험 문제 수정
	@PutMapping("/update/{examQuestionId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<ExamQuestionDto>> updateExamQuestion(
			@PathVariable Long examQuestionId,
			@RequestBody ExamQuestionDto examQuestionDto) {
		ResponseDto<ExamQuestionDto> responseDto = examQuestionService.updateExamQuestions(examQuestionId, examQuestionDto);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
	
	// 시험 문제 삭제
	@DeleteMapping("/delete/{examQuestionId}")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<String>> deleteExamQuestion(@PathVariable Long examQuestionId) {
		ResponseDto<String> reponseDto = examQuestionService.deleteExamQuestions(examQuestionId);
		return ResponseEntity.status(HttpStatus.OK).body(reponseDto);
	}
}