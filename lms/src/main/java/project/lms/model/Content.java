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
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;

    @Column(name = "contentType", length = 50, nullable = false)
    private String contentType;

//    @Lob
    // @Lob은 Java Persistence API (JPA)에서 Large Object를 나타내는 어노테이션.
    // Large Object (LOB)는 데이터베이스에 대용량의 데이터를 저장할 때 사용.
    // ex) 텍스트나 이미지, 오디오, 비디오 등의 큰 데이터를 저장할 때 @Lob 어노테이션을 사용할 수 있음.
//    @Column(name = "contentData", nullable = false)
//    private byte[] contentData;
    
    @Column
    private String ContentData;

    // 기본 생성자
	public Content() {
		super();
	}

	public Content(Long contentId, Course course, String contentType, String contentData) {
		super();
		this.contentId = contentId;
		this.course = course;
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