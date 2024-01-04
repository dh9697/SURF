package project.lms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.AssignmentHistory;
import project.lms.service.AssignmentHistoryService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class AssignmentHistoryController {

	private final AssignmentHistoryService assignmentHistoryService;

	public AssignmentHistoryController(AssignmentHistoryService assignmentHistoryService) {
		super();
		this.assignmentHistoryService = assignmentHistoryService;
	}
	
	@GetMapping("/assignmenthistory")
	public List<AssignmentHistory> getAllAssignmentHistories(){
		return assignmentHistoryService.getAllAssignmentHistories();
	}
	
	@PostMapping("/assignmenthistory")
	public AssignmentHistory createAssignmentHistory(@RequestBody AssignmentHistory assignmentHistory) {
		return assignmentHistoryService.createAssignmentHistory(assignmentHistory);
	}
}
