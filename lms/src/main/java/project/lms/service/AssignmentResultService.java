package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.AssignmentResult;
import project.lms.repository.AssignmentResultRepository;

@Service
public class AssignmentResultService {

	private final AssignmentResultRepository assignmentResultRepository;
	
	public AssignmentResultService(AssignmentResultRepository assignmentResultRepository) {
		super();
		this.assignmentResultRepository = assignmentResultRepository;
	}

	public List<AssignmentResult> getAllAssignmentResults(){
		return assignmentResultRepository.findAll();
	}
	
	public AssignmentResult createAssignmentResult(AssignmentResult assignmentResult) {
		return assignmentResultRepository.save(assignmentResult);
	}
}
