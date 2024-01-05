package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.ExamResult;
import project.lms.repository.ExamResultRepository;

@Service
public class ExamResultService {

	private final ExamResultRepository examResultRepository;

	public ExamResultService(ExamResultRepository examResultRepository) {
		super();
		this.examResultRepository = examResultRepository;
	}
	
	public List<ExamResult> getAllExamResults(){
		return examResultRepository.findAll();
	}
	
	public ExamResult createExamResult(ExamResult examResult) {
		return examResultRepository.save(examResult);
	}
}
