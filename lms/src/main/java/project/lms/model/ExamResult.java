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
@Table(name = "examResults")
public class ExamResult {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long examResultId;
	
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "examId")
	private Exam exam;
	
	@Column
	private boolean isCorrect;
	
	@Column
	private String wrongAnsExpl;
	
	@Column
	private String correctAnswer;
	
	@Column
	private String submittedAnswer;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime subminssionTime;

	public ExamResult() {
		super();
	}

	public ExamResult(Long examResultId, Member member, Exam exam, boolean isCorrect, String wrongAnsExpl,
			String correctAnswer, String submittedAnswer, LocalDateTime subminssionTime) {
		super();
		this.examResultId = examResultId;
		this.member = member;
		this.exam = exam;
		this.isCorrect = isCorrect;
		this.wrongAnsExpl = wrongAnsExpl;
		this.correctAnswer = correctAnswer;
		this.submittedAnswer = submittedAnswer;
		this.subminssionTime = subminssionTime;
	}

	public Long getExamResultId() {
		return examResultId;
	}

	public void setExamResultId(Long examResultId) {
		this.examResultId = examResultId;
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

	public boolean isCorrect() {
		return isCorrect;
	}

	public void setCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}

	public String getWrongAnsExpl() {
		return wrongAnsExpl;
	}

	public void setWrongAnsExpl(String wrongAnsExpl) {
		this.wrongAnsExpl = wrongAnsExpl;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public String getSubmittedAnswer() {
		return submittedAnswer;
	}

	public void setSubmittedAnswer(String submittedAnswer) {
		this.submittedAnswer = submittedAnswer;
	}

	public LocalDateTime getSubminssionTime() {
		return subminssionTime;
	}

	public void setSubminssionTime(LocalDateTime subminssionTime) {
		this.subminssionTime = subminssionTime;
	}
	
}
