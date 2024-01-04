package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

}
