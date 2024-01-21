package project.lms.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "courses")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long courseId;
	
	@ManyToOne
    @JoinColumn(name = "subjectId")
    private Subject subject;
	
	@Column(nullable = false, length = 150)
	private String courseName;
	
	@Column(nullable = true, length = 500)
	private String description;
	
	@Column(nullable = false)	    
	private Integer durationMins;
	
	@Lob
	@Column(nullable = false, length = 500)
	private byte[] courseThumbnail;
	    
	@Column(nullable = false)
	private String contentLevel;

    @Column(nullable = false)
    private Integer price;
    
    @Column
    private String announcement;
    
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime startDate;
    
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endDate;
    
	public Course() {
		super();
	}

	public Course(Long courseId, Subject subject, String courseName, String description, Integer durationMins,
			byte[] courseThumbnail, String contentLevel, Integer price, String announcement, LocalDateTime startDate,
			LocalDateTime endDate) {
		super();
		this.courseId = courseId;
		this.subject = subject;
		this.courseName = courseName;
		this.description = description;
		this.durationMins = durationMins;
		this.courseThumbnail = courseThumbnail;
		this.contentLevel = contentLevel;
		this.price = price;
		this.announcement = announcement;
		this.startDate = startDate;
		this.endDate = endDate;
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

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	
}
