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
@Table(name = "examHistory")
public class ExamHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examHistoryId;
    
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    
    @ManyToOne
    @JoinColumn(name = "examId", nullable = false)
    private Exam exam;
    
    @Column(name = "examSubmissionTime")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime examSubmissionTime;
    
    @Column(name = "examCompletionStatus")
    private boolean examCompletionStatus;
    
    @Column(name = "score")
    private Integer score;

    // 기본 생성자
    public ExamHistory() {
  
    }

    // 전체 생성자
    public ExamHistory(Long examHistoryId, Member member, Exam exam, LocalDateTime examSubmissionTime, 
                       boolean examCompletionStatus, Integer score) {
        this.examHistoryId = examHistoryId;
        this.member = member;
        this.exam = exam;
        this.examSubmissionTime = examSubmissionTime;
        this.examCompletionStatus = examCompletionStatus;
        this.score = score;
    }

    // Getters and Setters
	public Long getExamHistoryId() {
		return examHistoryId;
	}

	public void setExamHistoryId(Long examHistoryId) {
		this.examHistoryId = examHistoryId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public LocalDateTime getExamSubmissionTime() {
		return examSubmissionTime;
	}

	public void setExamSubmissionTime(LocalDateTime examSubmissionTime) {
		this.examSubmissionTime = examSubmissionTime;
	}

	public boolean isExamCompletionStatus() {
		return examCompletionStatus;
	}

	public void setExamCompletionStatus(boolean examCompletionStatus) {
		this.examCompletionStatus = examCompletionStatus;
	}

	public Integer getScore() {
		return score;
	}

	public void setScore(Integer score) {
		this.score = score;
	}

}