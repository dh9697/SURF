package project.lms.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "qnaBoard")
public class QnaBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qnaBoardId;
    
    @ManyToOne
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;
    
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(columnDefinition = "text")
    private String description;
    
    @Column(columnDefinition = "text")
    private String content;
    
    @Column(name = "createdAt", nullable = false)
    private Timestamp createdAt;

	public QnaBoard() {
		super();
	}

	public QnaBoard(Long qnaBoardId, Course course, Member member, String title, String description, String content,
			Timestamp createdAt) {
		super();
		this.qnaBoardId = qnaBoardId;
		this.course = course;
		this.member = member;
		this.title = title;
		this.description = description;
		this.content = content;
		this.createdAt = createdAt;
	}

	public Long getQnaBoardId() {
		return qnaBoardId;
	}

	public void setQnaBoardId(Long qnaBoardId) {
		this.qnaBoardId = qnaBoardId;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
    
}
