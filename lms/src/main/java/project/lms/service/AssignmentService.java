package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Assignment;
import project.lms.repository.AssignmentRepository;

@Service
public class AssignmentService {
	
	private final AssignmentRepository assignmentRepository;

	public AssignmentService(AssignmentRepository assignmentRepository) {
		super();
		this.assignmentRepository = assignmentRepository;
	}
	
	public List<Assignment> getAllAssignments(){
		return assignmentRepository.findAll();
	}
	
	public Assignment createAssignment(Assignment assignment) {
		return assignmentRepository.save(assignment);
	}
}
