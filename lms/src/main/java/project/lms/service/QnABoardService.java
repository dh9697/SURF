package project.lms.service;

import project.lms.dto.QnABoardDto;
import project.lms.dto.ResponseDto;

import java.util.List;

public interface QnABoardService {
	
	// 모든 질문 조회
    ResponseDto<List<QnABoardDto>> getAllQnABoards();

    // 특정 회원이 작성한 모든 질문 조회
    ResponseDto<List<QnABoardDto>> getQnABoardsByMemberId(Long memberId);
    
    // 특정 강의에 대한 모든 질문 조회
    ResponseDto<List<QnABoardDto>> getQnABoardsByCourseId(Long courseId);

	// 질문 저장
    ResponseDto<QnABoardDto> createQnABoard(QnABoardDto qnaBoardDto);

    // 질문 수정
    ResponseDto<QnABoardDto> updateQnABoard(QnABoardDto qnaBoardDto);

    // 질문 삭제
    ResponseDto<String> deleteQnABoard(Long qnaId);
}