package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lms.dto.ExamResultDto;
import project.lms.dto.ResponseDto;
import project.lms.model.ExamResult;
import project.lms.repository.ExamQuestionRepository;
import project.lms.repository.ExamRepository;
import project.lms.repository.ExamResultRepository;
import project.lms.repository.MemberRepository;

@Service
public class ExamResultServiceImpl {

	private final ExamResultRepository examResultRepository;
	private final ExamQuestionRepository examQuestionRepository;
	private final MemberRepository memberRepository;
	private ExamRepository examRepository;
	
	@Autowired
	public ExamResultServiceImpl(ExamResultRepository examResultRepository,
			ExamQuestionRepository examQuestionRepository, MemberRepository memberRepository,
			ExamRepository examRepository) {
		super();
		this.examResultRepository = examResultRepository;
		this.examQuestionRepository = examQuestionRepository;
		this.memberRepository = memberRepository;
		this.examRepository = examRepository;
	}
	
	
	
}
