package project.lms.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contentHistory")
public class ContentHistory {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contentHistoryId;
	
	@ManyToOne
	@JoinColumn(name = "memberId", nullable = false)
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "contentId", nullable = false)
	private Content content;
	
	@Column(nullable = false)
	private LocalDateTime lastAccessed;
	
	@Column(name = "isCompleted", nullable = false)
	private Boolean isCompleted;

	public ContentHistory() {
		super();
	}

	public ContentHistory(Long contentHistoryId, Member member, Content content, LocalDateTime lastAccessed, Boolean isCompleted) {
		super();
		this.contentHistoryId = contentHistoryId;
		this.member = member;
		this.content = content;
		this.lastAccessed = lastAccessed;
		this.isCompleted = isCompleted;
	}

	public Long getContentHistoryId() {
		return contentHistoryId;
	}

	public void setContentHistoryId(Long contentHistoryId) {
		this.contentHistoryId = contentHistoryId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public LocalDateTime getLastAccessed() {
		return lastAccessed;
	}

	public void setLastAccessed(LocalDateTime lastAccessed) {
		this.lastAccessed = lastAccessed;
	}

	public Boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(Boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
	
}