package project.lms.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "courseHistory")
public class CourseHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long courseHistoryId;
	
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "courseId")
	private Course course;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime startDate;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime endDate;
    
	@Column
    private boolean contentStatus = false;

	public CourseHistory() {
		super();
	}

	public CourseHistory(Long courseHistoryId, Member member, Course course, LocalDateTime startDate,
			LocalDateTime endDate, boolean contentStatus) {
		super();
		this.courseHistoryId = courseHistoryId;
		this.member = member;
		this.course = course;
		this.startDate = startDate;
		this.endDate = endDate;
		this.contentStatus = contentStatus;
	}

	public Long getCourseHistoryId() {
		return courseHistoryId;
	}

	public void setCourseHistoryId(Long courseHistoryId) {
		this.courseHistoryId = courseHistoryId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
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

	public boolean isContentStatus() {
		return contentStatus;
	}

	public void setContentStatus(boolean contentStatus) {
		this.contentStatus = contentStatus;
	}
}