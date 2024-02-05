package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.ResponseDto;
import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;
import project.lms.service.ContentHistoryService;

@RestController
@RequestMapping("/api/content-history")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ContentHistoryController {

	private final ContentHistoryService contentHistoryService;
	
	@Autowired
	public ContentHistoryController(ContentHistoryService contentHistoryService) {
		super();
		this.contentHistoryService = contentHistoryService;
	}

	// 내 컨텐츠 이력 조회
	@GetMapping
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getMyContentHistories() {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getMyContentHistories();
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 컨텐츠 수강 시작
	@PostMapping("/start")
	public ResponseEntity<ResponseDto<ContentHistory>> startContent(Member member, Content content) {
		ResponseDto<ContentHistory> contentHistory = contentHistoryService.startContent(member, content);
		return new ResponseEntity<>(contentHistory, HttpStatus.CREATED);
	}
	
	// 컨텐츠 수강 완료
	@PostMapping("/complete/{contentHistoryId}")
	public ResponseEntity<ResponseDto<ContentHistory>> completeContent(@PathVariable Long contentHistoryId) {
		ResponseDto<ContentHistory> contentHistory = contentHistoryService.completeContent(contentHistoryId);
		return new ResponseEntity<>(contentHistory, HttpStatus.OK);
	}
}
