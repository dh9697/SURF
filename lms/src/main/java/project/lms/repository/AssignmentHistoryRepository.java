package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.AssignmentHistory;

public interface AssignmentHistoryRepository extends JpaRepository<AssignmentHistory, Long> {

}
