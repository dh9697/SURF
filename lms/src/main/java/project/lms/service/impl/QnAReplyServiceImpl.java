package project.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.QnAReplyDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.QnABoard;
import project.lms.model.QnAReply;
import project.lms.repository.MemberRepository;
import project.lms.repository.QnABoardRepository;
import project.lms.repository.QnAReplyRepository;
import project.lms.service.QnAReplyService;

@Service
public class QnAReplyServiceImpl implements QnAReplyService {
    private final QnAReplyRepository qnaReplyRepository;
    private final QnABoardRepository qnaBoardRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public QnAReplyServiceImpl(QnAReplyRepository qnaReplyRepository, QnABoardRepository qnaBoardRepository, MemberRepository memberRepository) {
        this.qnaReplyRepository = qnaReplyRepository;
        this.qnaBoardRepository = qnaBoardRepository;
        this.memberRepository = memberRepository;
    }

    // 권한을 확인해 로그인한 선생님이 강의 중인 Course의 QnABoard에만 QnAReply를 작성할 수 있도록
    @Override
    public ResponseDto<QnAReplyDto> createQnAReply(QnAReplyDto qnaReplyDto, Long memberId,  Long qnaId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
        QnABoard qnaBoard = qnaBoardRepository.findById(qnaId)
                .orElseThrow(() -> new InvalidRequestException("QnABoard not found", "해당 QnABoard를 찾을 수 없습니다."));
        Course course = qnaBoard.getCourse();

        //로그인한 선생님이 강의 중인 Course의 QnABoard에만 답변을 작성할 수 있도록 확인
        if (!member.getTeachingCourses().contains(course)) {
            throw new InvalidRequestException("Invalid Course", "선생님이 강의하지 않는 강의에 대해 답변을 작성할 수 없습니다.");
        }

        QnAReply qnaReply = new QnAReply();
        qnaReply.setQnaBoard(qnaBoard);
        qnaReply.setMember(member);
        qnaReply.setReplyText(qnaReplyDto.getReplyText());

        qnaReply = qnaReplyRepository.save(qnaReply);
        QnAReplyDto createdQnAReplyDto = QnAReplyDto.from(qnaReply);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), createdQnAReplyDto, "답변 작성이 완료되었습니다.");
    }

    // QnA 답변 삭제
    @Override
    public ResponseDto<String> deleteQnAReply(Long replyId) {
        if (!qnaReplyRepository.existsById(replyId)) {
            throw new InvalidRequestException("Reply not found", "해당 답변을 찾을 수 없습니다.");
        }
        qnaReplyRepository.deleteById(replyId);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "답변 댓글이 성공적으로 삭제되었습니다.");
    }

    // 모든 QnAReply 목록 조회
    @Transactional(readOnly = true)
    public ResponseDto<List<QnAReplyDto>> getAllQnAReplies() {
        List<QnAReplyDto> qnaReplyDtos = qnaReplyRepository.findAll().stream()
                .map(QnAReplyDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaReplyDtos, "Successfully retrieved all QnAReplies");
    }

    // 특정 회원이 작성한 QnAReply 목록을 조회
    @Transactional(readOnly = true)
    public ResponseDto<List<QnAReplyDto>> getQnARepliesByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));

        List<QnAReplyDto> qnaReplyDtos = qnaReplyRepository.findByMember(member).stream()
                .map(QnAReplyDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaReplyDtos, "Successfully retrieved QnAReplies by memberId");
    }

    // 특정 QnABoard에 대한 QnAReply 목록을 조회
    @Override
    public ResponseDto<List<QnAReplyDto>> getQnARepliesByQnABoardId(Long qnaId) {
        QnABoard qnaBoard = qnaBoardRepository.findById(qnaId)
                .orElseThrow(() -> new InvalidRequestException("QnABoard not found", "해당 QnABoard를 찾을 수 없습니다."));

        List<QnAReplyDto> qnaReplyDtos = qnaReplyRepository.findByQnaBoard(qnaBoard).stream()
                .map(QnAReplyDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaReplyDtos, "Successfully retrieved QnAReplies by QnABoardId");
    }
    
    // 특정 QnABoard에 대해 특정 회원이 작성한 QnAReply 목록 조회
    @Transactional(readOnly = true)
    public ResponseDto<List<QnAReplyDto>> getQnARepliesByQnABoardIdAndMemberId(Long qnaId, Long memberId) {
        QnABoard qnaBoard = qnaBoardRepository.findById(qnaId)
                .orElseThrow(() -> new InvalidRequestException("QnABoard not found", "해당 QnABoard를 찾을 수 없습니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));

        List<QnAReplyDto> qnaReplyDtos = qnaReplyRepository.findByQnaBoardAndMember(qnaBoard, member).stream()
                .map(QnAReplyDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaReplyDtos, "Successfully retrieved QnAReplies by QnABoardId and memberId");
    }
    
}