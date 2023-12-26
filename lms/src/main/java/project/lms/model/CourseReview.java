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
@Table(name = "courseReviews")
public class CourseReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne // ManyToOne 관계 설정: 하나의 리뷰는 여러 회원 ID를 가질 수 있음
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @ManyToOne // ManyToOne 관계 설정: 하나의 리뷰는 여러 강의 ID를 가질 수 있음
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;

    @Column(nullable = false)
    private Integer rating;

    @Column(nullable = true, length = 2000) // 리뷰 내용은 필수가 아닐 수 있음
    private String comment;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime reviewDate;

    // 기본 생성자
    public CourseReview() {
        super();
    }

    // 전체 생성자
	public CourseReview(Long reviewId, Member member, Course course, Integer rating, String comment,
			LocalDateTime reviewDate) {
		super();
		this.reviewId = reviewId;
		this.member = member;
		this.course = course;
		this.rating = rating;
		this.comment = comment;
		this.reviewDate = reviewDate;
	}

    // Getters and Setters
	public Long getReviewId() {
		return reviewId;
	}

	public void setReviewId(Long reviewId) {
		this.reviewId = reviewId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public LocalDateTime getReviewDate() {
		return reviewDate;
	}

	public void setReviewDate(LocalDateTime reviewDate) {
		this.reviewDate = reviewDate;
	}   
}
