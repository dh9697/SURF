package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.ExamResult;
import project.lms.service.ExamResultService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ExamResultController {

	private final ExamResultService examResultService;

	@Autowired
	public ExamResultController(ExamResultService examResultService) {
		super();
		this.examResultService = examResultService;
	}
	
	@GetMapping("/examresult")
	public List<ExamResult> getAllExamResults(){
		return examResultService.getAllExamResults();
	}
	
	@PostMapping("/examresult")
	public ExamResult create(@RequestBody ExamResult examResult) {
		return examResultService.createExamResult(examResult);
	}
}
