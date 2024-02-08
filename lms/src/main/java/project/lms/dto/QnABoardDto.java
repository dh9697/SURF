package project.lms.dto;

import java.time.LocalDateTime;

import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.QnABoard;

public class QnABoardDto {
	
	private Long qnaId;
    private Course course;
    private Member member;
    private String questionText;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
	public QnABoardDto() {
		super();
	}
	
	public QnABoardDto(Long qnaId, Course course, Member member, String questionText, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		super();
		this.qnaId = qnaId;
		this.course = course;
		this.member = member;
		this.questionText = questionText;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public static QnABoardDto from(QnABoard qnaBoard) {
        QnABoardDto qnaBoardDto = new QnABoardDto();
        qnaBoardDto.setQnaId(qnaBoard.getQnaId());
        qnaBoardDto.setCourse(qnaBoard.getCourse());
        qnaBoardDto.setMember(qnaBoard.getMember());
        qnaBoardDto.setQuestionText(qnaBoard.getQuestionText());
        qnaBoardDto.setCreatedAt(qnaBoard.getCreatedAt());
        qnaBoardDto.setUpdatedAt(qnaBoard.getUpdatedAt());
        return qnaBoardDto;
    }
	
	public Long getQnaId() {
		return qnaId;
	}
	public void setQnaId(Long qnaId) {
		this.qnaId = qnaId;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public Member getMember() {
		return member;
	}
	public void setMember(Member member) {
		this.member = member;
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

}