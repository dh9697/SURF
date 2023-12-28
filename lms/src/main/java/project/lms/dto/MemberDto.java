package project.lms.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;
import project.lms.model.Role;

public class MemberDto {
	
	private long memberId;

	private String loginId;

	private Role role;

	private String password;

	private String name;

	private LocalDate birthDate;

	private Gender gender;

	private Nationality nationality;

	private String email;

	private String phoneNum;
	
	private LocalDateTime joinDate;

	private boolean isActive;
}
