package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.QnABoardDto;
import project.lms.dto.ResponseDto;
import project.lms.service.QnABoardService;

import java.util.List;

@RestController
@RequestMapping("/api/qna-boards")
@CrossOrigin(origins="http://localhost:3000",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class QnABoardController {

    private final QnABoardService qnaBoardService;

    @Autowired
    public QnABoardController(QnABoardService qnaBoardService) {
        super();
        this.qnaBoardService = qnaBoardService;
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<QnABoardDto>>> getAllQnABoards() {
        ResponseDto<List<QnABoardDto>> responseDto = qnaBoardService.getAllQnABoards();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/list/member/{memberId}")
    public ResponseEntity<ResponseDto<List<QnABoardDto>>> getQnABoardsByMemberId(@PathVariable Long memberId) {
        ResponseDto<List<QnABoardDto>> responseDto = qnaBoardService.getQnABoardsByMemberId(memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseDto<Void>> createQnABoard(@RequestBody QnABoardDto qnaBoardDto) {
        Long courseId = qnaBoardDto.getCourseId(); 
        Long memberId = qnaBoardDto.getMemberId(); 
        ResponseDto<Void> responseDto = qnaBoardService.createQnABoard(qnaBoardDto, courseId, memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PutMapping("/{qnaId}")
    public ResponseEntity<ResponseDto<QnABoardDto>> updateQnABoard(@PathVariable Long qnaId, @RequestBody QnABoardDto qnaBoardDto, @RequestParam Long memberId) {
        ResponseDto<QnABoardDto> responseDto = qnaBoardService.updateQnABoard(qnaId, qnaBoardDto, memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{qnaId}")
    public ResponseEntity<ResponseDto<String>> deleteQnABoard(@PathVariable Long qnaId, @RequestParam Long memberId) {
        ResponseDto<String> responseDto = qnaBoardService.deleteQnABoard(qnaId, memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.NO_CONTENT);
    }
}