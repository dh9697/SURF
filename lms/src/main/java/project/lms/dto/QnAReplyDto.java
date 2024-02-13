package project.lms.dto;

import project.lms.model.QnAReply;

public class QnAReplyDto {
	
	private Long replyId;
    private Long qnaId;
    private String replyText;
    private Long memberId;
    
	public QnAReplyDto() {
		super();
	}
	
	public QnAReplyDto(Long replyId, Long qnaId, String replyText, Long memberId) {
		super();
		this.replyId = replyId;
		this.qnaId = qnaId;
		this.replyText = replyText;
		this.memberId = memberId;
	}
	
	public static QnAReplyDto from(QnAReply qnaReply) {
        QnAReplyDto qnaReplyDto = new QnAReplyDto();
        qnaReplyDto.setReplyId(qnaReply.getReplyId());
        qnaReplyDto.setQnaId(qnaReply.getQnaBoard().getQnaId());
        qnaReplyDto.setReplyText(qnaReply.getReplyText());
      qnaReplyDto.setMemberId(qnaReply.getMember().getMemberId());

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

	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}
	
}