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
@Table(name = "assignments")
public class Assignment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long assignmentId;
	
	@ManyToOne
	@JoinColumn(name = "contentId")
	private Content content;
	
	@Column(nullable = false, length = 200)
	private String assignmentTitle;
	
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime dueDate;
	
	@Column(columnDefinition = "TEXT")
    private String description;
	
	@Column(nullable = false)
    private Integer passingScore;
	
	@Column
	private boolean isActive;

	public Assignment() {
		super();
	}

	public Assignment(Long assignmentId, Content content, String assignmentTitle, LocalDateTime dueDate,
			String description, Integer passingScore, boolean isActive) {
		super();
		this.assignmentId = assignmentId;
		this.content = content;
		this.assignmentTitle = assignmentTitle;
		this.dueDate = dueDate;
		this.description = description;
		this.passingScore = passingScore;
		this.isActive = isActive;
	}

	public Long getAssignmentId() {
		return assignmentId;
	}

	public void setAssignmentId(Long assignmentId) {
		this.assignmentId = assignmentId;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public String getAssignmentTitle() {
		return assignmentTitle;
	}

	public void setAssignmentTitle(String assignmentTitle) {
		this.assignmentTitle = assignmentTitle;
	}

	public LocalDateTime getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDateTime dueDate) {
		this.dueDate = dueDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getPassingScore() {
		return passingScore;
	}

	public void setPassingScore(Integer passingScore) {
		this.passingScore = passingScore;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}

