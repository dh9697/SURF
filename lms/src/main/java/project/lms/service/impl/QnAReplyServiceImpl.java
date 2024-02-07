package project.lms.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.QnAReplyDto;
import project.lms.dto.ResponseDto;
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
    @Transactional
    public ResponseDto<Void> createQnAReply(QnAReplyDto qnaReplyDto, Long memberId, Long qnaId) {
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

        qnaReplyRepository.save(qnaReply);

        return new ResponseDto<>("Success", null, "QnAReply has been successfully created");
    }

    // 수정하려는 답변을 작성한 선생님만 수정할 수 있도록
    @Transactional
    public ResponseDto<QnAReplyDto> updateQnAReply(Long replyId, QnAReplyDto qnaReplyDto, Long memberId) {
        QnAReply qnaReply = qnaReplyRepository.findById(replyId)
                .orElseThrow(() -> new InvalidRequestException("QnAReply not found", "해당 QnAReply를 찾을 수 없습니다."));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
        
        // 수정하려는 답변을 작성한 선생님이 로그인한 사용자인지 확인
        if (!qnaReply.getMember().getMemberId().equals(member.getMemberId())) {
            throw new InvalidRequestException("Invalid Member", "답변을 수정할 권한이 없습니다.");
        }

        // 답변 내용 업데이트
        qnaReply.setReplyText(qnaReplyDto.getReplyText());

        qnaReply = qnaReplyRepository.save(qnaReply);

        return new ResponseDto<>("Success", QnAReplyDto.from(qnaReply), "답변이 성공적으로 수정되었습니다.");
    }

    // 삭제하려는 답변을 작성한 선생님 혹은 Admin 권한을 가진 유저만 삭제할 수 있도록
    @Transactional
    public ResponseDto<String> deleteQnAReply(Long replyId, Long memberId) {
        QnAReply qnaReply = qnaReplyRepository.findById(replyId)
                .orElseThrow(() -> new InvalidRequestException("QnAReply not found", "해당 QnAReply를 찾을 수 없습니다."));

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
        
        // 삭제하려는 QnAReply를 작성한 작성자 혹은 Admin 권한을 가진 유저만 삭제할 수 있도록 확인
        boolean isAdmin = member.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthorityName().equals("ROLE_ADMIN"));

        if (!qnaReply.getMember().getMemberId().equals(member.getMemberId()) && !isAdmin) {
            throw new InvalidRequestException("Invalid Member", "QnAReply를 삭제할 권한이 없습니다.");
        }

        qnaReplyRepository.delete(qnaReply);

        return new ResponseDto<>("Success", null, "QnAReply has been successfully deleted");
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
    @Transactional(readOnly = true)
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