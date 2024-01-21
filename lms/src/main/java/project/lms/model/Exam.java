package project.lms.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime examDate;

    // 답안 수정
    @OneToMany(mappedBy = "exam")
    private List<ExamQuestion> examQuestions;

    @Column(nullable = false)
    private Integer durationMins;

    @Column(nullable = false)
    private Integer passingScore;

    @Column(name = "examIsActive")
    private Boolean examIsActive;

	public Exam() {
		super();
	}
	
	public Exam(Long examId, Course course, LocalDateTime examDate, List<ExamQuestion> examQuestions,
			Integer durationMins, Integer passingScore, Boolean examIsActive) {
		super();
		this.examId = examId;
		this.course = course;
		this.examDate = examDate;
		this.examQuestions = examQuestions;
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

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public LocalDateTime getExamDate() {
		return examDate;
	}

	public void setExamDate(LocalDateTime examDate) {
		this.examDate = examDate;
	}

	public List<ExamQuestion> getExamQuestions() {
		return examQuestions;
	}

	public void setExamQuestions(List<ExamQuestion> examQuestions) {
		this.examQuestions = examQuestions;
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

	public Integer getNumQuestions() {
		return examQuestions != null ? examQuestions.size() : 0;
	}
}
