package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.QnAReplyDto;
import project.lms.dto.ResponseDto;
import project.lms.service.QnAReplyService;

import java.util.List;

@RestController
@RequestMapping("/api/qna-replies")
@CrossOrigin(origins="http://localhost:3000",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class QnAReplyController {

    private final QnAReplyService qnaReplyService;

    @Autowired
    public QnAReplyController(QnAReplyService qnaReplyService) {
        super();
        this.qnaReplyService = qnaReplyService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<QnAReplyDto>>> getAllQnAReplies() {
        ResponseDto<List<QnAReplyDto>> responseDto = qnaReplyService.getAllQnAReplies();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/member/{memberId}")
    public ResponseEntity<ResponseDto<List<QnAReplyDto>>> getQnARepliesByMemberId(@PathVariable Long memberId) {
        ResponseDto<List<QnAReplyDto>> responseDto = qnaReplyService.getQnARepliesByMemberId(memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseDto<Void>> createQnAReply(@RequestBody QnAReplyDto qnaReplyDto, @RequestParam Long memberId, @RequestParam Long qnaId) {
        ResponseDto<Void> responseDto = qnaReplyService.createQnAReply(qnaReplyDto, memberId, qnaId);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PutMapping("/{replyId}")
    public ResponseEntity<ResponseDto<QnAReplyDto>> updateQnAReply(@PathVariable Long replyId, @RequestBody QnAReplyDto qnaReplyDto, @RequestParam Long memberId) {
        ResponseDto<QnAReplyDto> responseDto = qnaReplyService.updateQnAReply(replyId, qnaReplyDto, memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{replyId}")
    public ResponseEntity<ResponseDto<String>> deleteQnAReply(@PathVariable Long replyId, @RequestParam Long memberId) {
        ResponseDto<String> responseDto = qnaReplyService.deleteQnAReply(replyId, memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.NO_CONTENT);
    }
}