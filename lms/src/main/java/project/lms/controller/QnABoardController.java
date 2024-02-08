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

    // 전체 QnA 댓글 조회
    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<QnABoardDto>>> getAllQnABoards() {
        ResponseDto<List<QnABoardDto>> responseDto = qnaBoardService.getAllQnABoards();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // memberId를 통해 해당 member가 쓴 QnA 댓글 조회
    @GetMapping("/list/member/{memberId}")
    public ResponseEntity<ResponseDto<List<QnABoardDto>>> getQnABoardsByMemberId(@PathVariable Long memberId) {
        ResponseDto<List<QnABoardDto>> responseDto = qnaBoardService.getQnABoardsByMemberId(memberId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
    
    // courseId를 통해 해당하는 course의 QnA 댓글 조회
    @GetMapping("/list/course/{courseId}")
    public ResponseEntity<ResponseDto<List<QnABoardDto>>> getQnABoardsByCourseId(@PathVariable Long courseId) {
        ResponseDto<List<QnABoardDto>> responseDto = qnaBoardService.getQnABoardsByCourseId(courseId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // QnA 댓글 작성 (memberId와 courseId를 조회해 해당하는 course를 수강 중인 member만 댓글 작성 가능)
    @PostMapping
    public ResponseEntity<ResponseDto<QnABoardDto>> createQnABoard(@RequestBody QnABoardDto qnaBoardDto) {
//        Long courseId = qnaBoardDto.getCourseId(); // QnABoardDto에서 courseId를 추출
//        Long memberId = qnaBoardDto.getMemberId(); // QnABoardDto에서 memberId를 추출
        ResponseDto<QnABoardDto> responseDto = qnaBoardService.createQnABoard(qnaBoardDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // qnaId를 통해 해당 QnA 댓글 수정 (memberId를 통해 수정하려는 댓글을 작성한 작성하자만 댓글 수정 가능)
    @PutMapping("/{qnaId}")
    public ResponseEntity<ResponseDto<QnABoardDto>> updateQnABoard(@PathVariable Long qnaId, @RequestBody QnABoardDto qnaBoardDto) {
        qnaBoardDto.setQnaId(qnaId);
        ResponseDto<QnABoardDto> responseDto = qnaBoardService.updateQnABoard(qnaBoardDto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    // qnaId를 통해 해당 QnA 댓글 삭제 (해당 댓글 작성자와 관리자만 삭제 가능)
    @DeleteMapping("/{qnaId}")
    public ResponseEntity<ResponseDto<String>> deleteQnABoard(@PathVariable Long qnaId) {
        ResponseDto<String> responseDto = qnaBoardService.deleteQnABoard(qnaId);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}