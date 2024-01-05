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

import project.lms.model.Exam;
import project.lms.service.ExamService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ExamController {

	private final ExamService examService;

	@Autowired
	public ExamController(ExamService examService) {
		super();
		this.examService = examService;
	}
	
	@GetMapping("/exam")
	public List<Exam> getAllExams(){
		return examService.getAllExams();
	}
	
	@PostMapping("/exam")
	public Exam createExam(@RequestBody Exam exam) {
		return examService.createExam(exam);
	}
}
