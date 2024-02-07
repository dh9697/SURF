package project.lms.model;

import java.time.LocalDateTime;

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
@Table(name = "notifications")
public class Notification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long notificationId;
	
	@ManyToOne
	@JoinColumn(name = "senderId", nullable = false)
	private Member sender;  // 알림을 보내는 주체
	
	@ManyToOne
	@JoinColumn(name = "receiverId", nullable = false)
	private Member receiver;  // 알림을 받는 주체
	
	@ManyToOne
    @JoinColumn(name = "courseId")
    private Course course;  // 관련 강좌
	
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime notificationDate;
	
	private String notificationText;
	
	private Boolean isRead;
	
	private String notificationType;

	public Notification() {
		super();
	}

	public Notification(Long notificationId, Member sender, Member receiver, Course course,
			LocalDateTime notificationDate, String notificationText, Boolean isRead, String notificationType) {
		super();
		this.notificationId = notificationId;
		this.sender = sender;
		this.receiver = receiver;
		this.course = course;
		this.notificationDate = notificationDate;
		this.notificationText = notificationText;
		this.isRead = isRead;
		this.notificationType = notificationType;
	}

	public Long getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(Long notificationId) {
		this.notificationId = notificationId;
	}

	public Member getSender() {
		return sender;
	}

	public void setSender(Member sender) {
		this.sender = sender;
	}

	public Member getReceiver() {
		return receiver;
	}

	public void setReceiver(Member receiver) {
		this.receiver = receiver;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public LocalDateTime getNotificationDate() {
		return notificationDate;
	}

	public void setNotificationDate(LocalDateTime notificationDate) {
		this.notificationDate = notificationDate;
	}

	public String getNotificationText() {
		return notificationText;
	}

	public void setNotificationText(String notificationText) {
		this.notificationText = notificationText;
	}

	public Boolean getIsRead() {
		return isRead;
	}

	public void setIsRead(Boolean isRead) {
		this.isRead = isRead;
	}

	public String getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}
	
}
