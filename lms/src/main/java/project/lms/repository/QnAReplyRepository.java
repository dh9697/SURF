package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.QnABoard;
import project.lms.model.QnAReply;

import java.util.List;

public interface QnAReplyRepository extends JpaRepository<QnAReply, Long> {
	
	List<QnAReply> findByMember(Member member);
	
    List<QnAReply> findByQnaBoard(QnABoard qnaBoard);
	
	List<QnAReply> findByQnaBoardAndMember(QnABoard qnaBoard, Member member);

    List<QnAReply> findByMemberAndQnaBoard_Course(Member member, Course course);
    
}