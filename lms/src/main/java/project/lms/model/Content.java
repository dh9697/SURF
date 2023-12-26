package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contents")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentID;

    @ManyToOne
    @JoinColumn(name = "courseID", nullable = false)
    private Course course;

    @Column(name = "contentType", length = 50, nullable = false)
    private String contentType;

    @Lob
    // @Lob은 Java Persistence API (JPA)에서 Large Object를 나타내는 어노테이션.
    // Large Object (LOB)는 데이터베이스에 대용량의 데이터를 저장할 때 사용.
    // ex) 텍스트나 이미지, 오디오, 비디오 등의 큰 데이터를 저장할 때 @Lob 어노테이션을 사용할 수 있음.
    @Column(name = "contentData", nullable = false)
    private byte[] contentData;

    @ManyToOne
    @JoinColumn(name = "contentCategoryID", nullable = false)
    private ContentCategory contentCategory;

    // 기본 생성자
	public Content() {
		super();
	}

	// 전체 생성자
	public Content(Long contentID, Course course, String contentType, byte[] contentData,
			ContentCategory contentCategory) {
		super();
		this.contentID = contentID;
		this.course = course;
		this.contentType = contentType;
		this.contentData = contentData;
		this.contentCategory = contentCategory;
	}

	// Getters and Setters
	public Long getContentID() {
		return contentID;
	}

	public void setContentID(Long contentID) {
		this.contentID = contentID;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public byte[] getContentData() {
		return contentData;
	}

	public void setContentData(byte[] contentData) {
		this.contentData = contentData;
	}

	public ContentCategory getContentCategory() {
		return contentCategory;
	}

	public void setContentCategory(ContentCategory contentCategory) {
		this.contentCategory = contentCategory;
	}

    
}