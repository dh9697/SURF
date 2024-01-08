package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;

    @Column(name = "contentTitle", length = 30, nullable = false)
    private String contentTitle;
    
    @Column(name = "description", length = 100, nullable = false)
    private String description;
    
    @Column(name = "contentType", length = 50, nullable = false)
    private String contentType;

    // @Lob 으로 저장할 건지
    @Column
    private String ContentData;

	public Content() {
		super();
	}

	public Content(Long contentId, Course course, String contentTitle, String description, String contentType,
			String contentData) {
		super();
		this.contentId = contentId;
		this.course = course;
		this.contentTitle = contentTitle;
		this.description = description;
		this.contentType = contentType;
		ContentData = contentData;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
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

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getContentData() {
		return ContentData;
	}

	public void setContentData(String contentData) {
		ContentData = contentData;
	}
    
}