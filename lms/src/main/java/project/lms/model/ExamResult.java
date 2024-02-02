package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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
	private Integer submittedAnswer;
	
	@Column
	private boolean isCorrect;
	
	@Column
	private String wrongAnsExpl;

	public ExamResult() {
		super();
	}

	public ExamResult(Long examResultId, Member member, Exam exam, Integer submittedAnswer, boolean isCorrect,
			String wrongAnsExpl) {
		super();
		this.examResultId = examResultId;
		this.member = member;
		this.exam = exam;
		this.submittedAnswer = submittedAnswer;
		this.isCorrect = isCorrect;
		this.wrongAnsExpl = wrongAnsExpl;
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

	public Integer getSubmittedAnswer() {
		return submittedAnswer;
	}

	public void setSubmittedAnswer(Integer submittedAnswer) {
		this.submittedAnswer = submittedAnswer;
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
}
