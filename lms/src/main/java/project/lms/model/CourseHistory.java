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
	
	@ManyToOne // 하나의 CourseHistory는 하나의 Member와 연관
	@JoinColumn(name = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "courseId")
	private Course course;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime attendanceTime; // 수강한 시간
	
	@Column(nullable = false)
	private boolean completionStatus; // 수료 여부

	public CourseHistory() {
		super();
	}

	public CourseHistory(Long courseHistoryId, Member member, Course course, LocalDateTime attendanceTime,
			boolean completionStatus) {
		super();
		this.courseHistoryId = courseHistoryId;
		this.member = member;
		this.course = course;
		this.attendanceTime = attendanceTime;
		this.completionStatus = completionStatus;
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

	public LocalDateTime getAttendanceTime() {
		return attendanceTime;
	}

	public void setAttendanceTime(LocalDateTime attendanceTime) {
		this.attendanceTime = attendanceTime;
	}

	public boolean isCompletionStatus() {
		return completionStatus;
	}

	public void setCompletionStatus(boolean completionStatus) {
		this.completionStatus = completionStatus;
	}
	
	
}
