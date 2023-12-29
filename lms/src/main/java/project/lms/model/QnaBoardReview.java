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
@Table(name = "QnaBoardReviews")
public class QnaBoardReview {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "qnaBoardId")
	private QnaBoard qnaBoard;
	
    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    
    @Column(columnDefinition = "text")
    private String content;
    
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;
}
