package project.lms.dto;

import java.util.List;

import project.lms.model.Course;

public class CourseDto {
	private Long courseId;
	
    private Long subjectId;
    
    private List<String> instructorLoginIds;
    
    private List<String> instructorNames;

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
	
	public CourseDto(Long courseId, Long subjectId, List<String> instructorLoginIds, List<String> instructorNames,
			String courseName, String description, Integer durationMins, byte[] courseThumbnail, String contentLevel,
			Integer price, String announcement) {
		super();
		this.courseId = courseId;
		this.subjectId = subjectId;
		this.instructorLoginIds = instructorLoginIds;
		this.instructorNames = instructorNames;
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

	public Long getSubjectId() {
		return subjectId;
	}

	public void setSubjectId(Long subjectId) {
		this.subjectId = subjectId;
	}

	public List<String> getInstructorLoginIds() {
		return instructorLoginIds;
	}

	public void setInstructorLoginIds(List<String> instructorLoginIds) {
		this.instructorLoginIds = instructorLoginIds;
	}

	public List<String> getInstructorNames() {
		return instructorNames;
	}

	public void setInstructorNames(List<String> instructorNames) {
		this.instructorNames = instructorNames;
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

	public static CourseDto from(Course course) {
		CourseDto courseDto = new CourseDto();
		
		courseDto.setCourseId(course.getCourseId());
        courseDto.setAnnouncement(course.getAnnouncement());
        courseDto.setContentLevel(course.getContentLevel());
        courseDto.setCourseName(course.getCourseName());
        courseDto.setCourseThumbnail(course.getCourseThumbnail());
        courseDto.setDescription(course.getDescription());
        courseDto.setDurationMins(course.getDurationMins());
        courseDto.setPrice(course.getPrice());
        if(course.getSubject() != null) {
            courseDto.setSubjectId(course.getSubject().getSubjectId());
        }
        
        return courseDto;
	}
	
}
