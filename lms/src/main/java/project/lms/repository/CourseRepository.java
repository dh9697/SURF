package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import project.lms.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
	
	// (코스 이름으로 찾기)
	List<Course> findByCourseName(String courseName);
		
	// (콘텐츠 레벨로 찾기)
	List<Course> findByContentLevel(String contentLevel);
		
	// (코스 최소 가격 ~ 최대 가격으로 찾기)
	List<Course> findByPriceBetween(Integer minPrice, Integer maxPrice);
		
	// (코스 설명에 포함된 단어로 찾기)
	List<Course> findByDescriptionContaining(String keyword);

	// 서브젝트로 찾기
	List<Course> findBySubject_SubjectId(Long subjectId);
	
	// course 당 content 개수
	// 코드 추가
	@Query("SELECT COUNT(c) FROM Content c WHERE c.course.courseId = :courseId")
	   Long countContentsByCourseId(@Param("courseId") Long courseId);
	
}