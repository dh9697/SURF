package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.CourseHistory;

public interface CourseHistoryRepository extends JpaRepository<CourseHistory, Long> {

}
