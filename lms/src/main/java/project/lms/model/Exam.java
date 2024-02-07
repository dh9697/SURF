package project.lms.model;

import jakarta.persistence.*;
import java.util.List;

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

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private List<ExamQuestion> examQuestions;

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

    public List<ExamQuestion> getExamQuestions() {
        return this.examQuestions;
    }

    public void setExamQuestions(List<ExamQuestion> examQuestions) {
        this.examQuestions = examQuestions;
    }
    
}
