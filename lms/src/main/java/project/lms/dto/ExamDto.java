package project.lms.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExamDto {

	private Long courseId;
	private List<ExamQuestionDto> examQuestions;
	private LocalDateTime examDate;
	private Integer durationMins;
	private Integer passingScore;
	private Boolean examIsActive;
	
	public ExamDto() {
		super();
	}
	
	public ExamDto(Long courseId, List<ExamQuestionDto> examQuestions, LocalDateTime examDate, Integer durationMins,
			Integer passingScore, Boolean examIsActive) {
		super();
		this.courseId = courseId;
		this.examQuestions = examQuestions;
		this.examDate = examDate;
		this.durationMins = durationMins;
		this.passingScore = passingScore;
		this.examIsActive = examIsActive;
	}
	
	public Long getCourseId() {
		return courseId;
	}
	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}
	public List<ExamQuestionDto> getExamQuestions() {
		return examQuestions;
	}
	public void setExamQuestions(List<ExamQuestionDto> examQuestions) {
		this.examQuestions = examQuestions;
	}
	public LocalDateTime getExamDate() {
		return examDate;
	}
	public void setExamDate(LocalDateTime examDate) {
		this.examDate = examDate;
	}
	public Integer getDurationMins() {
		return durationMins;
	}
	public void setDurationMins(Integer durationMins) {
		this.durationMins = durationMins;
	}
	public Integer getPassingScore() {
		return passingScore;
	}
	public void setPassingScore(Integer passingScore) {
		this.passingScore = passingScore;
	}
	public Boolean getExamIsActive() {
		return examIsActive;
	}
	public void setExamIsActive(Boolean examIsActive) {
		this.examIsActive = examIsActive;
	}
	
}
