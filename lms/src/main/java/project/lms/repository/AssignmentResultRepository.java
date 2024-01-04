package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.AssignmentResult;

public interface AssignmentResultRepository extends JpaRepository<AssignmentResult, Long> {

}
