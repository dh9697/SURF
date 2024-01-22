package project.lms.model;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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

    // 답안이 보이게는 어떻게?
    @JsonIgnore
    // @JsonIgnore를 사용하여 examQuestions 필드를 제외시킴으로써
    // Jackson은 examQuestions를 무시하고 Exam 객체를 JSON으로 변환
    // get할 때 무한루프에 빠지는 거 같은데 쌤께 물어보기!!
    @OneToMany(mappedBy = "exam")
    private List<ExamQuestion> examQuestions;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime examDate;
    
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
