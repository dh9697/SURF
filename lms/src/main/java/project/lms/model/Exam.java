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
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    @ManyToOne
    @JoinColumn(name = "contentId", nullable = false)
    private Content content;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime examDate;

    @Column(nullable = false)
    private String CorrectAns;
    
    @Column(nullable = false)
    private Integer numQuestions;

    @Column(nullable = false)
    private Integer durationMins;

    @Column(nullable = false)
    private Integer passingScore;

    @Column(name = "examIsActive")
    private Boolean examIsActive;

	public Exam() {
		super();
	}

	public Exam(Long examId, Content content, LocalDateTime examDate, String correctAns, Integer numQuestions,
			Integer durationMins, Integer passingScore, Boolean examIsActive) {
		super();
		this.examId = examId;
		this.content = content;
		this.examDate = examDate;
		CorrectAns = correctAns;
		this.numQuestions = numQuestions;
		this.durationMins = durationMins;
		this.passingScore = passingScore;
		this.examIsActive = examIsActive;
	}

	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public LocalDateTime getExamDate() {
		return examDate;
	}

	public void setExamDate(LocalDateTime examDate) {
		this.examDate = examDate;
	}

	public String getCorrectAns() {
		return CorrectAns;
	}

	public void setCorrectAns(String correctAns) {
		CorrectAns = correctAns;
	}

	public Integer getNumQuestions() {
		return numQuestions;
	}

	public void setNumQuestions(Integer numQuestions) {
		this.numQuestions = numQuestions;
	}

	public Integer getDurationMins() {
		return durationMins;
	}

	public void setDurationMins(Integer durationMins) {
		this.durationMins = durationMins;
	}

	public Integer getPassingScore() {
		return passingScore;
	}

	public void setPassingScore(Integer passingScore) {
		this.passingScore = passingScore;
	}

	public Boolean getExamIsActive() {
		return examIsActive;
	}

	public void setExamIsActive(Boolean examIsActive) {
		this.examIsActive = examIsActive;
	}
	
}
