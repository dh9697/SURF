package project.lms.model;

import java.security.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;

@Entity
@Table(name = "members", 
	uniqueConstraints = { 
		@UniqueConstraint(name = "uk_member_login_id", 
			columnNames = {"loginId"})
	})
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;
	
	@Column(nullable = false, length = 50)
	private String loginId;
	
	private String roleId;
	
	private String password;
	
	private String name;
	
	private LocalDate birthDate;
	
	private Gender gender;
	
	private Nationality nationality;
	
	private String email;
	
	private String phoneNum;
	
	private String emergencyNum;
	
	private String photo;
	
	private Timestamp joinDate;
	
	private boolean isActive;

	public Member() {
		super();
	}

	public Member(Long memberId, String loginId, String roleId, String password, String name, LocalDate birthDate,
			Gender gender, Nationality nationality, String email, String phoneNum, String emergencyNum, String photo,
			Timestamp joinDate, boolean isActive) {
		super();
		this.memberId = memberId;
		this.loginId = loginId;
		this.roleId = roleId;
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

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
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
}

