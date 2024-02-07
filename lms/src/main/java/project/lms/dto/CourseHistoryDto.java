package project.lms.dto;

import project.lms.model.CourseHistory;

public class CourseHistoryDto {

	private CourseHistory courseHistory;
    private Long totalContents;
    private Long completedContents;
    
	public CourseHistoryDto() {
		super();
	}
	
	public CourseHistoryDto(CourseHistory courseHistory, Long totalContents, Long completedContents) {
		super();
		this.courseHistory = courseHistory;
		this.totalContents = totalContents;
		this.completedContents = completedContents;
	}
	
	public CourseHistory getCourseHistory() {
		return courseHistory;
	}
	public void setCourseHistory(CourseHistory courseHistory) {
		this.courseHistory = courseHistory;
	}
	public Long getTotalContents() {
		return totalContents;
	}
	public void setTotalContents(Long totalContents) {
		this.totalContents = totalContents;
	}
	public Long getCompletedContents() {
		return completedContents;
	}
	public void setCompletedContents(Long completedContents) {
		this.completedContents = completedContents;
	}
    
}