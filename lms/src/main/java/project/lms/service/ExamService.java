package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Exam;
import project.lms.repository.ExamRepository;

@Service
public class ExamService {

	private final ExamRepository examRepository;

	public ExamService(ExamRepository examRepository) {
		super();
		this.examRepository = examRepository;
	}
	
	public List<Exam> getAllExams(){
		return examRepository.findAll();
	}
	
	public Exam createExam(Exam exam) {
		return examRepository.save(exam);
	}
}
