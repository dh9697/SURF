package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lms.dto.ExamDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.model.Exam;
import project.lms.repository.CourseRepository;
import project.lms.repository.ExamRepository;
import project.lms.service.ExamService;

@Service
public class ExamServiceImpl implements ExamService {

	private ExamRepository examRepository;
	private CourseRepository courseRepository;

	@Autowired
	public ExamServiceImpl(ExamRepository examRepository) {
		super();
		this.examRepository = examRepository;
	}
	
	// 시험 전체 조회 - 관리자 기능?
	@Override
	public ResponseDto<List<Exam>> getAllExams() {
		List<Exam> exams = examRepository.findAll();
		
		if(exams == null || exams.isEmpty()) {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"시험이 존재하지 않습니다.");
		} else {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exams,
					"시험 목록을 조회하였습니다.");
		}
	}
	
	// 특정 과목 시험 조회 - 관리자, 선생님 기능?
	@Override
	public ResponseDto<List<Exam>> getExamByCourse(Long courseId){
		List<Exam> exams = examRepository.findByCourseId(courseId);
		
		if(exams == null || exams.isEmpty()) {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"해당 과목의 시험이 존재하지 않습니다.");
		} else {
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exams,
					"해당 과목의 시험을 조회하였습니다.");
		}
	}
	
	// 시험 생성과 수정
	public ResponseDto<ExamDto> createOrUpdateExam(ExamDto examDto) {
		Exam exam = new Exam();
	}
}
