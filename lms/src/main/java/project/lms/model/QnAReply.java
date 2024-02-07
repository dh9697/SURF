package project.lms.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "qnaReply")
public class QnAReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;
    
    @ManyToOne
    @JoinColumn(name = "qnaId", nullable = false)
    private QnABoard qnaBoard;
    
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    
    private String replyText;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    public QnAReply() {
		super();
	}

	public QnAReply(Long replyId, QnABoard qnaBoard, Member member, String replyText, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.replyId = replyId;
		this.qnaBoard = qnaBoard;
		this.member = member;
		this.replyText = replyText;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getReplyId() {
		return replyId;
	}

	public void setReplyId(Long replyId) {
		this.replyId = replyId;
	}

	public QnABoard getQnaBoard() {
		return qnaBoard;
	}

	public void setQnaBoard(QnABoard qnaBoard) {
		this.qnaBoard = qnaBoard;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}