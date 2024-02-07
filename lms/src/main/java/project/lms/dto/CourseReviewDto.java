package project.lms.dto;

import java.time.LocalDateTime;
import project.lms.model.CourseReview;
import project.lms.model.Member;

public class CourseReviewDto {

    private Long reviewId;
    private Member member;
    private Long courseId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
    
    public CourseReviewDto() {
		super();
	}

	public CourseReviewDto(Long reviewId, Member member, Long courseId, Integer rating, String comment,
			LocalDateTime reviewDate) {
		super();
		this.reviewId = reviewId;
		this.member = member;
		this.courseId = courseId;
		this.rating = rating;
		this.comment = comment;
		this.reviewDate = reviewDate;
	}

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

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
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

	public static CourseReviewDto from(CourseReview courseReview) {
        CourseReviewDto dto = new CourseReviewDto();
        dto.setReviewId(courseReview.getReviewId());
        dto.setMember(courseReview.getMember());
        dto.setCourseId(courseReview.getCourse().getCourseId());
        dto.setRating(courseReview.getRating());
        dto.setComment(courseReview.getComment());
        dto.setReviewDate(courseReview.getReviewDate());
        return dto;
    }
}