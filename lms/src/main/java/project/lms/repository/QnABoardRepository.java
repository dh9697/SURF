package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.lms.model.QnABoard;
import project.lms.model.Course;
import project.lms.model.Member;

import java.util.List;

@Repository
public interface QnABoardRepository extends JpaRepository<QnABoard, Long> {

	// 본인이 작성한 댓글 조회
    List<QnABoard> findByMember(Member member);
    
    // 특정 강의에 작성한 댓글 조회
    List<QnABoard> findByCourse(Course course);
    
}