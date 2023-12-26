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
@Table(name = "courses")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long courseId;
	
	@Column(nullable = false, length = 150)
	private String courseName;
	
	@Column(nullable = true, length = 500)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "instructorId", nullable = false)
	private Instructor instructor;
	
	@Column(nullable = false)	    
	private Integer durationMins;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime startDate;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endDate;

	public Course() {
		super();
	}

	public Course(Long courseId, String courseName, String description, Instructor instructor,
			Integer durationMins, LocalDateTime startDate, LocalDateTime endDate) {
		super();
		this.courseId = courseId;
		this.courseName = courseName;
		this.description = description;
		this.instructor = instructor;
		this.durationMins = durationMins;
		this.startDate = startDate;
		this.endDate = endDate;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}

	public Integer getDurationMins() {
		return durationMins;
	}

	public void setDurationMins(Integer durationMins) {
		this.durationMins = durationMins;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}
	 
}
