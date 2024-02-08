package project.lms.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Course;
import project.lms.model.CourseHistory;
import project.lms.model.Member;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {
	
	List<CourseHistory> findByCourseCourseId(Long courseId);
	
	List<CourseHistory> findByMember(Member member);
	
	CourseHistory findByMemberAndCourse(Member member, Course course);

//    // 특정 회원의 수강 이력 조회
//    List<CourseHistory> findByMember(Member member);
//
    // 특정 강좌의 수강 이력 조회
//    List<CourseHistory> findByCourse(Course course);
//
//    // 특정 날짜 범위 내의 수강 이력 조회
//    List<CourseHistory> findByStartDateBetween(LocalDate startDate, LocalDate endDate);
//
//    // 특정 회원과 강좌의 수강 이력 조회
//    List<CourseHistory> findByMemberAndCourse(Member member, Course course);
//
//    // 종료일이 null인(아직 종료되지 않은) 수강 이력 조회
//    List<CourseHistory> findByEndDateIsNull();
//
//    // 특정 날짜 이후에 종료된 수강 이력 조회
//    List<CourseHistory> findByEndDateAfter(LocalDate date);
//
//    // 특정 회원의 가장 최근 수강 이력 조회
//    CourseHistory findTopByMemberOrderByStartDateDesc(Member member);
//
//    // 특정 강좌의 수강 이력 개수 조회
//    long countByCourse(Course course);
//
//    // 종료일이 null이고 시작일이 특정 날짜 이전인 수강 이력 조회
//    List<CourseHistory> findByEndDateIsNullAndStartDateBefore(LocalDate date);
    
}