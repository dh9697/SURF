package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.CourseReview;

public interface CourseReviewRepository extends JpaRepository<CourseReview, Long>{

	List<CourseReview> findByMember_MemberId(Long memberId);
	
	List<CourseReview> findByCourse_CourseId(Long courseId);
}
