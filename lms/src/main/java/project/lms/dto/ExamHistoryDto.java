package project.lms.dto;

import project.lms.model.ExamHistory;

public class ExamHistoryDto {

    private Long examHistoryId;
    private Long memberId; // memberId 필드 추가
    private ExamDto exam;
    private boolean examCompletionStatus;

    public ExamHistoryDto() {
    }

    public ExamHistoryDto(Long examHistoryId, Long memberId, ExamDto exam, boolean examCompletionStatus) {
        this.examHistoryId = examHistoryId;
        this.memberId = memberId; // memberId 초기화
        this.exam = exam;
        this.examCompletionStatus = examCompletionStatus;
    }

    public Long getExamHistoryId() {
        return examHistoryId;
    }

    public void setExamHistoryId(Long examHistoryId) {
        this.examHistoryId = examHistoryId;
    }

    // memberId에 대한 getter 메소드
    public Long getMemberId() {
        return memberId;
    }

    // memberId에 대한 setter 메소드
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
            examHistory.getMember().getMemberId(), // Member 객체에서 memberId를 가져옴
            new ExamDto(examHistory.getExam().getContent().getContentId(), examHistory.getExam().getExamIsActive()),
            examHistory.isExamCompletionStatus()
        );
    }
}
