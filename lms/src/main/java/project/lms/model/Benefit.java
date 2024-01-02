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
	private String couponCode;
	
	@Column
	private int completionCount;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime expirationDate;
	
	@Column
	private boolean isActive;
}
