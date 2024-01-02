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
@Table(name = "assignmentResults")
public class AssignmentResult {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long assignmentResultId;
	
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "assignmentId")
	private Assignment assignment;
	
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
	private LocalDateTime submissionTime;

	public AssignmentResult() {
		super();
	}

	public AssignmentResult(Long assignmentResultId, Member member, Assignment assignment, boolean isCorrect,
			String wrongAnsExpl, String correctAnswer, String submittedAnswer, LocalDateTime submissionTime) {
		super();
		this.assignmentResultId = assignmentResultId;
		this.member = member;
		this.assignment = assignment;
		this.isCorrect = isCorrect;
		this.wrongAnsExpl = wrongAnsExpl;
		this.correctAnswer = correctAnswer;
		this.submittedAnswer = submittedAnswer;
		this.submissionTime = submissionTime;
	}

	public Long getAssignmentResultId() {
		return assignmentResultId;
	}

	public void setAssignmentResultId(Long assignmentResultId) {
		this.assignmentResultId = assignmentResultId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Assignment getAssignment() {
		return assignment;
	}

	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
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

	public LocalDateTime getSubmissionTime() {
		return submissionTime;
	}

	public void setSubmissionTime(LocalDateTime submissionTime) {
		this.submissionTime = submissionTime;
	}
	
}
