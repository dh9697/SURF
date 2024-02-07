package project.lms.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "announcements")
public class Announcement {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long announcementId;
	
	@ManyToOne
	@JoinColumn(name = "memberId", nullable = false)
	private Member member;  // 공지사항을 작성한 사용자
	
	private String announcementText;
	
	@CreationTimestamp
	private LocalDateTime announcementDate;
	
	private Boolean isImportant;

	public Announcement() {
		super();
	}

	public Announcement(Long announcementId, Member member, String announcementText, LocalDateTime announcementDate,
			Boolean isImportant) {
		super();
		this.announcementId = announcementId;
		this.member = member;
		this.announcementText = announcementText;
		this.announcementDate = announcementDate;
		this.isImportant = isImportant;
	}

	public Long getAnnouncementId() {
		return announcementId;
	}

	public void setAnnouncementId(Long announcementId) {
		this.announcementId = announcementId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getAnnouncementText() {
		return announcementText;
	}

	public void setAnnouncementText(String announcementText) {
		this.announcementText = announcementText;
	}

	public LocalDateTime getAnnouncementDate() {
		return announcementDate;
	}

	public void setAnnouncementDate(LocalDateTime announcementDate) {
		this.announcementDate = announcementDate;
	}

	public Boolean getIsImportant() {
		return isImportant;
	}

	public void setIsImportant(Boolean isImportant) {
		this.isImportant = isImportant;
	}

	
}
