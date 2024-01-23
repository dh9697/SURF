package project.lms.dto;

import project.lms.model.Member;
import project.lms.model.Subject;

public class CourseDto {

	private Long courseId;
	
    private Subject subject;
    
    private Member instructor;

	private String courseName;

	private String description;
    
	private Integer durationMins;

	private byte[] courseThumbnail;

	private String contentLevel;

    private Integer price;

    private String announcement;

	public CourseDto() {
		super();
	}

	public CourseDto(Long courseId, Subject subject, Member instructor, String courseName, String description,
			Integer durationMins, byte[] courseThumbnail, String contentLevel, Integer price, String announcement) {
		super();
		this.courseId = courseId;
		this.subject = subject;
		this.instructor = instructor;
		this.courseName = courseName;
		this.description = description;
		this.durationMins = durationMins;
		this.courseThumbnail = courseThumbnail;
		this.contentLevel = contentLevel;
		this.price = price;
		this.announcement = announcement;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public Subject getSubject() {
		return subject;
	}

	public void setSubject(Subject subject) {
		this.subject = subject;
	}

	public Member getInstructor() {
		return instructor;
	}

	public void setInstructor(Member instructor) {
		this.instructor = instructor;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getDurationMins() {
		return durationMins;
	}

	public void setDurationMins(Integer durationMins) {
		this.durationMins = durationMins;
	}

	public byte[] getCourseThumbnail() {
		return courseThumbnail;
	}

	public void setCourseThumbnail(byte[] courseThumbnail) {
		this.courseThumbnail = courseThumbnail;
	}

	public String getContentLevel() {
		return contentLevel;
	}

	public void setContentLevel(String contentLevel) {
		this.contentLevel = contentLevel;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public String getAnnouncement() {
		return announcement;
	}

	public void setAnnouncement(String announcement) {
		this.announcement = announcement;
	}
	
}
