package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.repository.CourseHistoryRepository;
import project.lms.repository.CourseRepository;
import project.lms.repository.MemberRepository;
import project.lms.repository.QnABoardRepository;
import project.lms.service.QnABoardService;
import project.lms.dto.CourseReviewDto;
import project.lms.dto.QnABoardDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.QnABoard;
import project.lms.model.Course;
import project.lms.model.CourseHistory;
import project.lms.model.CourseReview;
import project.lms.model.Member;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QnABoardServiceImpl implements QnABoardService {

    private final QnABoardRepository qnaBoardRepository;
    private final MemberRepository memberRepository;
    private final CourseRepository courseRepository;
    private final CourseHistoryRepository courseHistoryRepository;

    @Autowired
    public QnABoardServiceImpl(QnABoardRepository qnaBoardRepository, MemberRepository memberRepository, CourseRepository courseRepository, CourseHistoryRepository courseHistoryRepository) {
        this.qnaBoardRepository = qnaBoardRepository;
        this.memberRepository = memberRepository;
        this.courseRepository = courseRepository;
        this.courseHistoryRepository = courseHistoryRepository;
    }

    // 질문 작성
    @Override
    public ResponseDto<QnABoardDto> createQnABoard(QnABoardDto qnaBoardDto) {
        Member member = memberRepository.findById(qnaBoardDto.getMember().getMemberId())
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
        Course course = courseRepository.findById(qnaBoardDto.getCourse().getCourseId())
                .orElseThrow(() -> new InvalidRequestException("Course not found", "해당 강의를 찾을 수 없습니다."));

        //로그인한 유저가 수강 중인 Course의 QnABoard에만 댓글을 작성할 수 있도록 확인
        CourseHistory courseHistory = courseHistoryRepository.findByMemberAndCourse(member, course);
        if (courseHistory == null) {
            throw new InvalidRequestException("Invalid Course", "회원이 수강 중이지 않은 강의에 대해 질문을 작성할 수 없습니다.");
        }

        QnABoard qnaBoard = new QnABoard();
        qnaBoard.setCourse(course);
        qnaBoard.setMember(member);
        qnaBoard.setQuestionText(qnaBoardDto.getQuestionText());

        qnaBoard = qnaBoardRepository.save(qnaBoard);
        QnABoardDto createdQnABoardDto = QnABoardDto.from(qnaBoard);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), createdQnABoardDto, "질문이 성공적으로 작성되었습니다");
    }

    // 수정하려는 댓글을 작성한 작성자만 수정할 수 있도록
    @Override
    public ResponseDto<QnABoardDto> updateQnABoard(QnABoardDto qnaBoardDto) {
        QnABoard qnaBoard = qnaBoardRepository.findById(qnaBoardDto.getQnaId())
                .orElseThrow(() -> new InvalidRequestException("QnABoard not found", "해당 질문을 찾을 수 없습니다."));

//        Member member = memberRepository.findById(qnaBoardDto.getMember().getMemberId())
//                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));
//        
//        // 수정하려는 댓글을 작성한 작성자가 로그인한 사용자인지 확인
//        if (!qnaBoardDto.getMember().getMemberId().equals(qnaBoard.getMember().getMemberId())) {
//            throw new InvalidRequestException("Invalid Member", "댓글을 수정할 권한이 없습니다.");
//        }

        // 댓글 내용 업데이트
        qnaBoard.setQuestionText(qnaBoardDto.getQuestionText());
        qnaBoard = qnaBoardRepository.save(qnaBoard);
        QnABoardDto updatedQnABoardDto = QnABoardDto.from(qnaBoard);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedQnABoardDto, "질문이 성공적으로 수정되었습니다.");

    }

    // 삭제하려는 댓글을 작성한 작성자 혹은 Admin 권한을 가진 유저만 삭제할 수 있도록
    @Override
    public ResponseDto<String> deleteQnABoard(Long qnaId) {
        if (!qnaBoardRepository.existsById(qnaId)) {
            throw new InvalidRequestException("QnA not found", "해당 질문 댓글을 찾을 수 없습니다.");
        }
        qnaBoardRepository.deleteById(qnaId);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "질문 댓글이 성공적으로 삭제되었습니다.");
    }

    // 모든 질문 댓글 조회
    @Transactional(readOnly = true)
    public ResponseDto<List<QnABoardDto>> getAllQnABoards() {
        List<QnABoardDto> qnaBoardDtos = qnaBoardRepository.findAll().stream()
                .map(QnABoardDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaBoardDtos, "Successfully retrieved all QnABoards");
    }

    // 특정 회원이 작성한 질문 댓글 조회
    @Transactional(readOnly = true)
    public ResponseDto<List<QnABoardDto>> getQnABoardsByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new InvalidRequestException("Member not found", "해당 회원을 찾을 수 없습니다."));

        List<QnABoardDto> qnaBoardDtos = qnaBoardRepository.findByMember(member).stream()
                .map(QnABoardDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaBoardDtos, "Successfully retrieved QnABoards by memberId");
    }
    
    // 코스별 질문 댓글 조회
    @Override
    public ResponseDto<List<QnABoardDto>> getQnABoardsByCourseId(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new InvalidRequestException("Course not found", "해당 과정을 찾을 수 없습니다."));
        
        List<QnABoardDto> qnaBoardDtos = qnaBoardRepository.findByCourse(course).stream()
                .map(QnABoardDto::from)
                .collect(Collectors.toList());

        return new ResponseDto<>("Success", qnaBoardDtos, "Successfully retrieved QnABoards by courseId");
    }

}