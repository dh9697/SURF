package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import project.lms.dto.ResponseDto;
import project.lms.model.Subject;
import project.lms.service.SubjectService;

@RestController
@RequestMapping("/api/subject")
@CrossOrigin(origins = "http://localhost:3000", 
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SubjectController {
	
	private final SubjectService subjectService;

	@Autowired
	public SubjectController(SubjectService subjectService) {
		super();
		this.subjectService = subjectService;
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectService.getAllSubjects().getData();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }
	
	@GetMapping("/list/{subjectId}")
    public ResponseEntity<ResponseDto<Subject>> getSubjectById(@PathVariable Long subjectId) {
        ResponseDto<Subject> responseDto = subjectService.getSubjectById(subjectId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
	
	@PostMapping("/save")
	public ResponseEntity<ResponseDto<Subject>> saveSubject(@RequestBody Subject subject) {
        ResponseDto<Subject> response = subjectService.saveSubject(subject);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
	
	@PutMapping("/subject/update/{subjectId}")
    public ResponseEntity<ResponseDto<Subject>> updateSubject(
            @PathVariable Long subjectId,
            @RequestBody Subject updatedSubject) {
        ResponseDto<Subject> responseDto = subjectService.updateSubject(subjectId, updatedSubject);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @DeleteMapping("/subject/delete/{subjectId}")
    public ResponseEntity<ResponseDto<String>> deleteSubject(@PathVariable Long subjectId) {
        ResponseDto<String> responseDto = subjectService.deleteSubject(subjectId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
