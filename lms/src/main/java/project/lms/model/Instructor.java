package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "instructors", uniqueConstraints = {
		@UniqueConstraint(columnNames = "loginId"),
		@UniqueConstraint(columnNames = "email"),
		@UniqueConstraint(columnNames = "phoneNum")
})
public class Instructor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long instructorId;
	
	@Column(nullable = false, length = 50)
	private String loginId;
	
	@Column(nullable = false, length = 255)
	private String password;
	
	@Column(nullable = false, length = 50)
	private String name;
	
	@Column(nullable = false, length = 100)
	private String email;
	
	@Column(nullable = false, length = 20)
	private String phoneNum;
	
	@Column(nullable = true)
	private String resume;
	
	@Column(nullable = true, length = 255)
	private String photo;

	public Instructor() {
		super();
	}

	public Instructor(Long instructorId, String loginId, String password, String name, String email, String phoneNum,
			String resume, String photo) {
		super();
		this.instructorId = instructorId;
		this.loginId = loginId;
		this.password = password;
		this.name = name;
		this.email = email;
		this.phoneNum = phoneNum;
		this.resume = resume;
		this.photo = photo;
	}

	public Long getInstructorId() {
		return instructorId;
	}

	public void setInstructorId(Long instructorId) {
		this.instructorId = instructorId;
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

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
}
