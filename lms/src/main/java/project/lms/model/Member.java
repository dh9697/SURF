package project.lms.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;

@Entity
@Table(name = "members", 
	uniqueConstraints = { 
		@UniqueConstraint(name = "uk_member_loginId", 
			columnNames = {"loginId"}),
		@UniqueConstraint(name = "uk_member_email", 
			columnNames = {"email"}),
		@UniqueConstraint(name = "uk_member_phoneNum", 
			columnNames = {"phoneNum"})
	})
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;
	
	@ManyToMany
	@JoinTable(name = "member_authority",
	joinColumns = {@JoinColumn(name = "memberId", referencedColumnName = "memberId")},
	inverseJoinColumns = {@JoinColumn(name = "authorityName", referencedColumnName = "authorityName")})
	private Set<Authority> authorities;
	
	@ManyToMany
	@JoinTable(name = "teaching_courses",
	joinColumns = {@JoinColumn(name= "memberId", referencedColumnName = "memberId")},
	inverseJoinColumns = {@JoinColumn(name = "courseId", referencedColumnName = "courseId")})
	private Set<Course> teachingCourses;
	
	@Column(nullable = false, length = 50, updatable = false)
	private String loginId;
	
	@Column(nullable = false, length = 255)
	private String password;
	
	@Column(nullable = false, length = 50)
	private String name;
	
	@Column(nullable = false)
	@Temporal(TemporalType.DATE)
	private LocalDate birthDate;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private Nationality nationality;
	
	@Column(nullable = false, length = 100)
	private String email;
	
	@Column(nullable = false, length = 20)
	private String phoneNum;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime joinDate;
	
	@Column
	private String photo;
	
	@Column
	private String resume;
	
	@Column
	private boolean isActive;

	public Member() {
		super();
	}

	public Member(Long memberId, Set<Authority> authorities, Set<Course> teachingCourses, String loginId,
			String password, String name, LocalDate birthDate, Gender gender, Nationality nationality, String email,
			String phoneNum, LocalDateTime joinDate, String photo, String resume, boolean isActive) {
		super();
		this.memberId = memberId;
		this.authorities = authorities;
		this.teachingCourses = teachingCourses;
		this.loginId = loginId;
		this.password = password;
		this.name = name;
		this.birthDate = birthDate;
		this.gender = gender;
		this.nationality = nationality;
		this.email = email;
		this.phoneNum = phoneNum;
		this.joinDate = joinDate;
		this.photo = photo;
		this.resume = resume;
		this.isActive = isActive;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public Set<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<Authority> authorities) {
		this.authorities = authorities;
	}

	public Set<Course> getTeachingCourses() {
		return teachingCourses;
	}

	public void setTeachingCourses(Set<Course> teachingCourses) {
		this.teachingCourses = teachingCourses;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Nationality getNationality() {
		return nationality;
	}

	public void setNationality(Nationality nationality) {
		this.nationality = nationality;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public LocalDateTime getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(LocalDateTime joinDate) {
		this.joinDate = joinDate;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
}