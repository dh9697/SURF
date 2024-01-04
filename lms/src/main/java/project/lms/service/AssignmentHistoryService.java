package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.AssignmentHistory;
import project.lms.repository.AssignmentHistoryRepository;

@Service
public class AssignmentHistoryService {

	private final AssignmentHistoryRepository assignmentHistoryRepository;

	public AssignmentHistoryService(AssignmentHistoryRepository assignmentHistoryRepository) {
		super();
		this.assignmentHistoryRepository = assignmentHistoryRepository;
	}
	
	public List<AssignmentHistory> getAllAssignmentHistories(){
		return assignmentHistoryRepository.findAll();
	}
	
	public AssignmentHistory createAssignmentHistory(AssignmentHistory assignmentHistory) {
		return assignmentHistoryRepository.save(assignmentHistory);
	}
}
