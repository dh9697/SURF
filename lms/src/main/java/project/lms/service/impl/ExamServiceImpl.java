package project.lms.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ExamDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.model.Course;
import project.lms.model.Exam;
import project.lms.repository.ContentRepository;
import project.lms.repository.CourseRepository;
import project.lms.repository.ExamRepository;
import project.lms.service.ExamService;

@Service
public class ExamServiceImpl implements ExamService {

	private ExamRepository examRepository;
	private ContentRepository contentRepository;

	@Autowired
	public ExamServiceImpl(ExamRepository examRepository, ContentRepository contentRepository) {
		super();
		this.examRepository = examRepository;
		this.contentRepository = contentRepository;
	}
	
	// 시험 전체 조회 - 각 course의 선생님 권한
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

	// 컨텐츠에 따라 시험 목록 
	@Override
	public ResponseDto<List<Exam>> getExamByContent(Long contentId) {
		List<Exam> exams = examRepository.findByContentContentId(contentId);
			if (exams == null || exams.isEmpty()) {
				return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"해당 컨텐츠에 대한 시험이 없습니다.");
			} else {
				return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exams,
					"컨텐츠별 시험 목록을 조회하였습니다.");
			}
	}
	
	// 컨텐츠에 따라 시험 생성 
	@Transactional
	@Override
	public ResponseDto<Exam> createExam(ExamDto examDto) {
		try {
			Content content = contentRepository.findById(examDto.getContentId())
		            .orElseThrow(() -> new InvalidRequestException("Invalid Request", "컨텐츠가 존재하지 않거나 찾을 수 없습니다."));
			Exam exam = new Exam();
			exam.setContent(content);
			exam.setExamDate(LocalDateTime.now());
			exam.setDurationMins(examDto.getDurationMins());
			exam.setPassingScore(examDto.getPassingScore());
			exam.setExamIsActive(examDto.getExamIsActive());
			
			examRepository.save(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exam,
					"시험을 등록 하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"시험 등록에 실패하였습니다.");
		}
	}
	
	// 시험 수정
	@Transactional
	@Override
	public ResponseDto<Exam> updateExam(Long examId, ExamDto examDto) {
		try {
			Exam exam = examRepository.findById(examId)
					.orElseThrow(() -> new InvalidRequestException("Invalid Request", "해당 시험이 존재하지 않거나 찾을 수 없습니다."));
		
			exam.setExamDate(LocalDateTime.now());
			exam.setDurationMins(examDto.getDurationMins());
			exam.setPassingScore(examDto.getPassingScore());
			exam.setExamIsActive(examDto.getExamIsActive());
			
			examRepository.save(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					exam,
					"시험을 수정하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
	        return new ResponseDto<>(
	                ResultCode.ERROR.name(),
	                null,
	                "시험 수정에 실패하였습니다.");
		}
	}
	
	// 시험 삭제
	@Transactional
	@Override
	public ResponseDto<String> deleteExam(Long examId) {
		try {
			Exam exam = examRepository.findById(examId)
					.orElseThrow(() -> new InvalidRequestException("Invalid Request", "해당 시험이 존재하지 않거나 찾을 수 없습니다."));
			
			examRepository.delete(exam);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"시험을 삭제하였습니다.");
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"시험 삭제에 실패하였습니다.");
		}
	}

}
