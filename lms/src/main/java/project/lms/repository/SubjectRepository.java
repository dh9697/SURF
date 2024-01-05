package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

}
