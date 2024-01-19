package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ExamQuestionController {

	private final ExamQuestionService examQuestionService;

	@Autowired
	public ExamQuestionController(ExamQuestionService examQuestionService) {
		super();
		this.examQuestionService = examQuestionService;
	}
	
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<List<ExamQuestionDto>>> getExamQuestionsList(){
		ResponseDto<List<ExamQuestionDto>> responseDto = examQuestionService.getExamQuestionsList();
		return ResponseEntity.ok(responseDto);
	}
	
	@GetMapping("/{examId}/list")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<List<ExamQuestionDto>>> getExamQuestionsForExam(@PathVariable Long ExamId){
		ResponseDto<List<ExamQuestionDto>> responseDto = examQuestionService.getExamQuestionsForExam(ExamId);
		return ResponseEntity.ok(responseDto);
	}
	
	@PostMapping("/save")
	@PreAuthorize("hasAnyRole('INSTRUCTOR')")
	public ResponseEntity<ResponseDto<ExamQuestionDto>> saveExamQuestions(@RequestBody ExamQuestionDto examQuestionDto){
		ResponseDto<ExamQuestionDto> responseDto = examQuestionService.saveExamQuestions(examQuestionDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}
	
}
