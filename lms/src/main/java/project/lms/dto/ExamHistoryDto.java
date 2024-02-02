package project.lms.dto;

import project.lms.model.ExamHistory;

public class ExamHistoryDto {

	private Long examHistoryId;
    private Long memberId; 
    private ExamDto exam;
    private boolean examCompletionStatus;
    
	public ExamHistoryDto() {
		super();
	}
	
	public ExamHistoryDto(Long examHistoryId, Long memberId, ExamDto exam, boolean examCompletionStatus) {
		super();
		this.examHistoryId = examHistoryId;
		this.memberId = memberId;
		this.exam = exam;
		this.examCompletionStatus = examCompletionStatus;
	}

	public Long getExamHistoryId() {
		return examHistoryId;
	}

	public void setExamHistoryId(Long examHistoryId) {
		this.examHistoryId = examHistoryId;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public ExamDto getExam() {
		return exam;
	}

	public void setExam(ExamDto exam) {
		this.exam = exam;
	}

	public boolean isExamCompletionStatus() {
		return examCompletionStatus;
	}

	public void setExamCompletionStatus(boolean examCompletionStatus) {
		this.examCompletionStatus = examCompletionStatus;
	}
    
	public static ExamHistoryDto from(ExamHistory examHistory) {
        return new ExamHistoryDto(
            examHistory.getExamHistoryId(),
            examHistory.getMember().getMemberId(),
            new ExamDto(examHistory.getExam().getContent().getContentId(), examHistory.getExam().getExamIsActive()),
            examHistory.isExamCompletionStatus()
        );
    }
}
