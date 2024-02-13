package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ContentHistoryRequestDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;
import project.lms.service.ContentHistoryService;

import java.util.List;

@RestController
@RequestMapping("/api/content-histories")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ContentHistoryController {

	private final ContentHistoryService contentHistoryService;

	@Autowired
	public ContentHistoryController(ContentHistoryService contentHistoryService) {
		super();
		this.contentHistoryService = contentHistoryService;
	}
	
	// 모든 학습 이력 조회
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getAllContentHistories() {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getAllContentHistories();
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 특정 콘텐츠 ID에 대한 학습 이력 조회
	@GetMapping("/list/{contentId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getContentHistoriesByContent(@PathVariable Long contentId) {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getContentHistoriesByContent(contentId);
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 현재 로그인한 사용자의 학습 이력 조회
	@GetMapping
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getMyContentHistories() {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getMyContentHistories();
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 완료된 학습 이력 조회
	@GetMapping("/completed")
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getCompletedContentHistories() {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getCompletedContentHistories();
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 완료되지 않은 학습 이력 조회
	@GetMapping("/incomplete")
	public ResponseEntity<ResponseDto<List<ContentHistory>>> getIncompleteContentHistories() {
		ResponseDto<List<ContentHistory>> contentHistories = contentHistoryService.getIncompleteContentHistories();
		return new ResponseEntity<>(contentHistories, HttpStatus.OK);
	}
	
	// 콘텐츠 클릭 시 ContentHistory 생성
	@PostMapping("/create")
	public ResponseEntity<ResponseDto<ContentHistory>> createContentHistory(@RequestBody ContentHistoryRequestDto contentHistoryRequestDto) {
		ResponseDto<ContentHistory> contentHistory = contentHistoryService.createContentHistory(
				contentHistoryRequestDto.getMemberId(), contentHistoryRequestDto.getContentId());
		return new ResponseEntity<>(contentHistory, HttpStatus.CREATED);
	}

	// 학습 완료 버튼 클릭 시 isCompleted 필드 업데이트
	@PutMapping("/complete")
	public ResponseEntity<ResponseDto<ContentHistory>> completeContentHistory(@RequestBody ContentHistoryRequestDto contentHistoryRequestDto) {
		ResponseDto<ContentHistory> contentHistory = contentHistoryService.completeContentHistory(
				contentHistoryRequestDto.getMemberId(), contentHistoryRequestDto.getContentId());
		return new ResponseEntity<>(contentHistory, HttpStatus.OK);
	}
		
}