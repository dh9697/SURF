package project.lms.service;

import project.lms.dto.QnAReplyDto;
import project.lms.dto.ResponseDto;

import java.util.List;

public interface QnAReplyService {

    ResponseDto<Void> createQnAReply(QnAReplyDto qnaReplyDto, Long memberId, Long qnaId);

    ResponseDto<QnAReplyDto> updateQnAReply(Long replyId, QnAReplyDto qnaReplyDto, Long memberId);

    ResponseDto<String> deleteQnAReply(Long replyId, Long memberId);

    ResponseDto<List<QnAReplyDto>> getQnARepliesByQnABoardId(Long qnaId);

    ResponseDto<List<QnAReplyDto>> getAllQnAReplies();

    ResponseDto<List<QnAReplyDto>> getQnARepliesByMemberId(Long memberId);

    ResponseDto<List<QnAReplyDto>> getQnARepliesByQnABoardIdAndMemberId(Long qnaId, Long memberId);
    
}