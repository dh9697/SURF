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
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long examId;

    @ManyToOne
    @JoinColumn(name = "contentId", nullable = false)
    private Content content;

    @Column(name = "examIsActive")
    private Boolean examIsActive;

	public Exam() {
		super();
	}

	public Exam(Long examId, Content content, Boolean examIsActive) {
		super();
		this.examId = examId;
		this.content = content;
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

	public Boolean getExamIsActive() {
		return examIsActive;
	}

	public void setExamIsActive(Boolean examIsActive) {
		this.examIsActive = examIsActive;
	}
	
}
