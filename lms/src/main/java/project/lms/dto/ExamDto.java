package project.lms.dto;

public class ExamDto {

	private Long contentId;
	private Integer durationMins;
	private Integer passingScore;
	private Boolean examIsActive;
	
	public ExamDto() {
		super();
	}

	public ExamDto(Long contentId, Integer durationMins, Integer passingScore, Boolean examIsActive) {
		super();
		this.contentId = contentId;
		this.durationMins = durationMins;
		this.passingScore = passingScore;
		this.examIsActive = examIsActive;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
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
