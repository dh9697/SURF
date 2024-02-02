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
	
    @Column(name = "contentStatus")
    private boolean contentStatus;
	
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime lastAccessed;
	
	@Column(name = "progress", nullable = false)
	private Float progress;

	public ContentHistory() {
		super();
	}

	public ContentHistory(Long contentHistoryId, Member member, Content content, boolean contentStatus,
			LocalDateTime lastAccessed, Float progress) {
		super();
		this.contentHistoryId = contentHistoryId;
		this.member = member;
		this.content = content;
		this.contentStatus = contentStatus;
		this.lastAccessed = lastAccessed;
		this.progress = progress;
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

	public boolean isContentStatus() {
		return contentStatus;
	}

	public void setContentStatus(boolean contentStatus) {
		this.contentStatus = contentStatus;
	}

	public LocalDateTime getLastAccessed() {
		return lastAccessed;
	}

	public void setLastAccessed(LocalDateTime lastAccessed) {
		this.lastAccessed = lastAccessed;
	}

	public Float getProgress() {
		return progress;
	}

	public void setProgress(Float progress) {
		this.progress = progress;
	}
}