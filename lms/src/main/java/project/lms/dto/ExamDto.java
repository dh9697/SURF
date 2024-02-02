package project.lms.dto;

import project.lms.model.Content;
import project.lms.model.Exam;

public class ExamDto {

	private Long contentId;
	
	private Boolean examIsActive;
	
	public ExamDto() {
		super();
	}

	public ExamDto(Long contentId, Boolean examIsActive) {
		super();
		this.contentId = contentId;
		this.examIsActive = examIsActive;
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
	
	// examHistroySI에서 사용
	public Exam toExam(Content content) {
	    Exam exam = new Exam();
	    exam.setContent(content);
	    exam.setExamIsActive(this.examIsActive);
	    
	    return exam;
	}
}
