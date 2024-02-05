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
	
	@ManyToOne
	@JoinColumn(name = "examQuestionId")
	private ExamQuestion examQuestion;
	
	@Column
	private Integer submittedAnswer;
	
	@Column
	private boolean isCorrect;

	public ExamResult() {
		super();
	}

	public ExamResult(Long examResultId, Member member, Exam exam, ExamQuestion examQuestion, Integer submittedAnswer,
			boolean isCorrect) {
		super();
		this.examResultId = examResultId;
		this.member = member;
		this.exam = exam;
		this.examQuestion = examQuestion;
		this.submittedAnswer = submittedAnswer;
		this.isCorrect = isCorrect;
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

	public ExamQuestion getExamQuestion() {
		return examQuestion;
	}

	public void setExamQuestion(ExamQuestion examQuestion) {
		this.examQuestion = examQuestion;
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
	
}