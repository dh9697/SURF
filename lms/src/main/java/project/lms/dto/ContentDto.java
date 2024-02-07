package project.lms.dto;

public class ContentDto {
	
	private Long courseId;
	private String contentTitle;
	private String description;
	private Integer contentDuration;
	private String contentImg;
	
	public ContentDto(Long courseId, String contentTitle, String description, Integer contentDuration,
			String contentImg) {
		super();
		this.courseId = courseId;
		this.contentTitle = contentTitle;
		this.description = description;
		this.contentDuration = contentDuration;
		this.contentImg = contentImg;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public String getContentTitle() {
		return contentTitle;
	}

	public void setContentTitle(String contentTitle) {
		this.contentTitle = contentTitle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getContentDuration() {
		return contentDuration;
	}

	public void setContentDuration(Integer contentDuration) {
		this.contentDuration = contentDuration;
	}

	public String getContentImg() {
		return contentImg;
	}

	public void setContentImg(String contentImg) {
		this.contentImg = contentImg;
	}
	
}