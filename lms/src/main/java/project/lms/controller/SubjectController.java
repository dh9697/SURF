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

import project.lms.model.Subject;
import project.lms.service.SubjectService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:3000", 
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class SubjectController {
	
	private final SubjectService subjectService;

	@Autowired
	public SubjectController(SubjectService subjectService) {
		super();
		this.subjectService = subjectService;
	}
	
	@GetMapping("/subject")
	public List<Subject> getAllSubjects(){
		return subjectService.getAllSubjects();
	}
	
	@PostMapping("/subject")
	public Subject createSubject(@RequestBody Subject subject) {
		return subjectService.createSubject(subject);
	}
}
