package project.lms.dto;

import java.util.List;
import java.util.stream.Collectors;

import project.lms.model.Content;
import project.lms.model.Exam;

public class ExamResponseDto {
	
	private Long examId;
	private Long contentId;
    private Boolean examIsActive;
    private List<ExamQuestionDto> examQuestions;
    
	public ExamResponseDto() {
		super();
	}

	public ExamResponseDto(Long examId, Long contentId, Boolean examIsActive, List<ExamQuestionDto> examQuestions) {
		super();
		this.examId = examId;
		this.contentId = contentId;
		this.examIsActive = examIsActive;
		this.examQuestions = examQuestions;
	}

	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}

	public Boolean getExamIsActive() {
		return examIsActive;
	}

	public void setExamIsActive(Boolean examIsActive) {
		this.examIsActive = examIsActive;
	}

	public List<ExamQuestionDto> getExamQuestions() {
		return examQuestions;
	}

	public void setExamQuestions(List<ExamQuestionDto> examQuestions) {
		this.examQuestions = examQuestions;
	}

	public static ExamResponseDto from(Exam exam) {
        ExamResponseDto dto = new ExamResponseDto();
        dto.setExamId(exam.getExamId());
        dto.setContentId(exam.getContent().getContentId());
        dto.setExamIsActive(exam.getExamIsActive());
        dto.setExamQuestions(exam.getExamQuestions().stream()
            .map(ExamQuestionDto::from)
            .collect(Collectors.toList()));
        return dto;
    }
}
