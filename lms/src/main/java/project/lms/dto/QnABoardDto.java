package project.lms.dto;

import java.time.LocalDateTime;

import project.lms.model.QnABoard;

public class QnABoardDto {

	private Long qnaId;
	private Long courseId;
    private Long memberId;
    private String questionText;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public QnABoardDto() {
		super();
	}
    
    public QnABoardDto(Long qnaId, Long courseId, Long memberId, String questionText, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.qnaId = qnaId;
		this.courseId = courseId;
		this.memberId = memberId;
		this.questionText = questionText;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
    
    public Long getQnaId() {
		return qnaId;
	}

	public void setQnaId(Long qnaId) {
		this.qnaId = qnaId;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
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

	public static QnABoardDto from(QnABoard qnaBoard) {
        QnABoardDto qnaBoardDto = new QnABoardDto();
        qnaBoardDto.setQnaId(qnaBoard.getQnaId());
        qnaBoardDto.setCourseId(qnaBoard.getCourse().getCourseId());
        qnaBoardDto.setMemberId(qnaBoard.getMember().getMemberId());
        qnaBoardDto.setQuestionText(qnaBoard.getQuestionText());
        qnaBoardDto.setCreatedAt(qnaBoard.getCreatedAt());
        qnaBoardDto.setUpdatedAt(qnaBoard.getUpdatedAt());
        return qnaBoardDto;
    }
}
