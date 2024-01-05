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

import project.lms.model.ExamHistory;
import project.lms.service.ExamHistoryService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ExamHistoryController {

	private final ExamHistoryService examHistoryService;

	@Autowired
	public ExamHistoryController(ExamHistoryService examHistoryService) {
		super();
		this.examHistoryService = examHistoryService;
	}
	
	@GetMapping("/examhistory")
	public List<ExamHistory> getAllExamHistories(){
		return examHistoryService.getAllExamHistories();
	}
	
	@PostMapping("/examhistory")
	public ExamHistory createExamHistory(@RequestBody ExamHistory examHistory) {
		return examHistoryService.createExamHistory(examHistory);
	}
}
