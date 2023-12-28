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
	
	@Column(name = "startDate")
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime startDate;

	public CourseHistory() {
		super();
	}

	public CourseHistory(Long courseHistoryId, Member member, Course course, LocalDateTime startDate) {
		super();
		this.courseHistoryId = courseHistoryId;
		this.member = member;
		this.course = course;
		this.startDate = startDate;
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
	
}
