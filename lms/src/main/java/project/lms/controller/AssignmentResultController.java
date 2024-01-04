package project.lms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.AssignmentResult;
import project.lms.service.AssignmentResultService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class AssignmentResultController {

	public final AssignmentResultService assignmentResultService;

	public AssignmentResultController(AssignmentResultService assignmentResultService) {
		super();
		this.assignmentResultService = assignmentResultService;
	}
	
	@GetMapping("/assignmentresult")
	public List<AssignmentResult> getAllAssignmentResults(){
		return assignmentResultService.getAllAssignmentResults();
	}
	
	@PostMapping("/assignmentresult")
	public AssignmentResult createAssignmentResult(@RequestBody AssignmentResult assignmentResult) {
		return assignmentResultService.createAssignmentResult(assignmentResult);
	}
}
