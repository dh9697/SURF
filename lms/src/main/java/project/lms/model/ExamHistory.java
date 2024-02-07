package project.lms.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "examHistory")
public class ExamHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examHistoryId;
    
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    
    @ManyToOne(cascade = CascadeType.PERSIST) // ExamHistory 객체를 저장할 때 exam 필드에 설정된 Exam 객체도 함께 저장하라는 것을 나타냄
    @JoinColumn(name = "examId", nullable = false)
    private Exam exam;
    
    private boolean examCompletionStatus;

    public ExamHistory() {
  
    }

	public ExamHistory(Long examHistoryId, Member member, Exam exam, boolean examCompletionStatus) {
		super();
		this.examHistoryId = examHistoryId;
		this.member = member;
		this.exam = exam;
		this.examCompletionStatus = examCompletionStatus;
	}

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

	public boolean isExamCompletionStatus() {
		return examCompletionStatus;
	}

	public void setExamCompletionStatus(boolean examCompletionStatus) {
		this.examCompletionStatus = examCompletionStatus;
	}

}