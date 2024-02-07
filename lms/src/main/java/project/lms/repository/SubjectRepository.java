package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.lms.model.Subject;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
	
    List<Subject> findAll();
    
}
