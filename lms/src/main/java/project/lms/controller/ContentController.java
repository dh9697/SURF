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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ContentDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Content;
import project.lms.service.ContentService;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ContentController {

	private final ContentService contentService;

	@Autowired
	public ContentController(ContentService contentService) {
		super();
		this.contentService = contentService;
	}
	
	@GetMapping("/course/{courseId}")
	public ResponseEntity<ResponseDto<List<Content>>> getContentByCourse(@PathVariable Long courseId) {
		ResponseDto<List<Content>> response = contentService.getContentByCourse(courseId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping("/save")
	public ResponseEntity<ResponseDto<Content>> createContent(@RequestParam Long courseId, @RequestBody ContentDto contentDto) {
	    ResponseDto<Content> response = contentService.createContent(courseId, contentDto);
	    return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	@PutMapping("/update/{contentId}")
	public ResponseEntity<ResponseDto<Content>> updateContent(@PathVariable Long contentId, @RequestBody ContentDto contentDto) {
		ResponseDto<Content> response = contentService.updateContent(contentId, contentDto);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{contentId}")
	public ResponseEntity<ResponseDto<String>> deleteContent(@PathVariable Long contentId) {
		ResponseDto<String> response = contentService.deleteContent(contentId);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}