package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Subject;
import project.lms.repository.SubjectRepository;

@Service
public class SubjectService {

	private final SubjectRepository subjectRepository;

	public SubjectService(SubjectRepository subjectRepository) {
		super();
		this.subjectRepository = subjectRepository;
	}
	
	public List<Subject> getAllSubjects(){
		return subjectRepository.findAll();
	}
	
	public Subject createSubject(Subject subject) {
		return subjectRepository.save(subject);
	}
}
