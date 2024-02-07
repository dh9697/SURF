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
	
	public Exam toExam(Content content) {
	    Exam exam = new Exam();
	    exam.setContent(content);
	    exam.setExamIsActive(this.examIsActive);
	    
	    return exam;
	}
	
	// from exam 을 ExamDto로 변환해주는 메서드
    public static ExamDto from(Exam exam) {
        if(exam == null) return null;
        
        return new ExamDto(exam.getContent().getContentId(), exam.getExamIsActive());
    }
	
}