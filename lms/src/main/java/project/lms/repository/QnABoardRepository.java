package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.QnABoard;

public interface QnABoardRepository extends JpaRepository<QnABoard, Long> {

	// 본인이 작성한 댓글 조회
    List<QnABoard> findByMember(Member member);
    
    // 특정 강의에 작성한 댓글 조회
    List<QnABoard> findByCourse(Course course);
}
