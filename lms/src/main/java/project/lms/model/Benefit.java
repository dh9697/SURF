package project.lms.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import project.lms.enumstatus.Completion;

@Entity
@Table(name = "benefits")
public class Benefit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long benefitId;
	
	@ManyToOne
	@JoinColumn(name = "courseId")
	private Course course;
	
	@Column
	private String description;
	
	@Column
	@Enumerated(EnumType.STRING)
	private Completion completion;
	
	@Column
	private String couponCode;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime expirationDate;
	
	@Column
	private boolean isActive;

	public Benefit() {
		super();
	}

	public Benefit(Long benefitId, Course course, String description, Completion completion, String couponCode,
		 LocalDateTime expirationDate, boolean isActive) {
		super();
		this.benefitId = benefitId;
		this.course = course;
		this.description = description;
		this.completion = completion;
		this.couponCode = couponCode;
		this.expirationDate = expirationDate;
		this.isActive = isActive;
	}

	public Long getBenefitId() {
		return benefitId;
	}

	public void setBenefitId(Long benefitId) {
		this.benefitId = benefitId;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Completion getCompletion() {
		return completion;
	}

	public void setCompletion(Completion completion) {
		this.completion = completion;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public LocalDateTime getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDateTime expirationDate) {
		this.expirationDate = expirationDate;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}
