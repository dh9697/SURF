package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.CourseHistory;
import project.lms.model.Member;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {

	List<CourseHistory> findByCourseCourseId(Long courseId);
	List<CourseHistory> findByMember(Member member);
}
