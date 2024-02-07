package project.lms.dto;

import java.time.LocalDateTime;

import project.lms.model.QnAReply;

public class QnAReplyDto {
	
	private Long replyId;
    private Long qnaId;
    private Long memberId;
    private String replyText;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
	public QnAReplyDto() {
		super();
	}
	
	public QnAReplyDto(Long replyId, Long qnaId, Long memberId, String replyText, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.replyId = replyId;
		this.qnaId = qnaId;
		this.memberId = memberId;
		this.replyText = replyText;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public static QnAReplyDto from(QnAReply qnaReply) {
        QnAReplyDto qnaReplyDto = new QnAReplyDto();
        qnaReplyDto.setReplyId(qnaReply.getReplyId());
        qnaReplyDto.setQnaId(qnaReply.getQnaBoard().getQnaId());
        qnaReplyDto.setMemberId(qnaReply.getMember().getMemberId());
        qnaReplyDto.setReplyText(qnaReply.getReplyText());
        qnaReplyDto.setCreatedAt(qnaReply.getCreatedAt());
        qnaReplyDto.setUpdatedAt(qnaReply.getUpdatedAt());
        return qnaReplyDto;
    }

	public Long getReplyId() {
		return replyId;
	}

	public void setReplyId(Long replyId) {
		this.replyId = replyId;
	}

	public Long getQnaId() {
		return qnaId;
	}

	public void setQnaId(Long qnaId) {
		this.qnaId = qnaId;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
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