package project.lms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.Content;
import project.lms.service.ContentService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ContentController {

	private final ContentService contentService;

	public ContentController(ContentService contentService) {
		super();
		this.contentService = contentService;
	}
	
	@GetMapping("/content")
	public List<Content> getAllContents(){
		return contentService.getAllContents();
	}
	
	@PostMapping("/content")
	public Content createContent(@RequestBody Content content) {
		return contentService.createContent(content);
	}
}
