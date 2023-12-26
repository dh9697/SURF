package project.lms.model;

import java.security.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
	
	@Column(nullable = false, length = 50, updatable = false)
	private String loginId;
	
	@ManyToOne
	@JoinColumn(name = "roleId")
	private Role role;
	
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
	
	@Column(nullable = false, length = 20)
	private String emergencyNum;
	
	@Column(nullable = false, length = 255)
	private String photo;
	
	@Column
	private Timestamp joinDate;
	
	@Column
	private boolean isActive;
	
	@OneToOne
	@JoinColumn(name = "membershipId", referencedColumnName = "membershipId")
	private Membership membership;

	public Member() {
		super();
	}

	public Member(Long memberId, String loginId, Role role, String password, String name, LocalDate birthDate,
			Gender gender, Nationality nationality, String email, String phoneNum, String emergencyNum, String photo,
			Timestamp joinDate, boolean isActive, Membership membership) {
		super();
		this.memberId = memberId;
		this.loginId = loginId;
		this.role = role;
		this.password = password;
		this.name = name;
		this.birthDate = birthDate;
		this.gender = gender;
		this.nationality = nationality;
		this.email = email;
		this.phoneNum = phoneNum;
		this.emergencyNum = emergencyNum;
		this.photo = photo;
		this.joinDate = joinDate;
		this.isActive = isActive;
		this.membership = membership;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public String getLoginId() {
		return loginId;
	}

	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
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

	public String getEmergencyNum() {
		return emergencyNum;
	}

	public void setEmergencyNum(String emergencyNum) {
		this.emergencyNum = emergencyNum;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Timestamp getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Timestamp joinDate) {
		this.joinDate = joinDate;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Membership getMembership() {
		return membership;
	}

	public void setMembership(Membership membership) {
		this.membership = membership;
	}
	
}

