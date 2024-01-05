package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.ExamHistory;
import project.lms.repository.ExamHistoryRepository;

@Service
public class ExamHistoryService {

	private final ExamHistoryRepository examHistoryRepository;

	public ExamHistoryService(ExamHistoryRepository examHistoryRepository) {
		super();
		this.examHistoryRepository = examHistoryRepository;
	}
	
	public List<ExamHistory> getAllExamHistories(){
		return examHistoryRepository.findAll();
	}
	
	public ExamHistory createExamHistory(ExamHistory examHistory) {
		return examHistoryRepository.save(examHistory);
	}
}
