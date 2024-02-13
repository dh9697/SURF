package project.lms.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;
import project.lms.model.Member;

public class MemberSignUpDto {

    private Long memberId;

    @NotBlank
    private String loginId;

    private Set<AuthorityDto> authorityDtoSet;
    
    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{8,20}$",
        message = "영문, 숫자, 특수문자를 포함하여 8~20자리로 입력해주세요.")
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$",
        message = "날짜형식(YYYY-MM-DD)을 확인해주세요.")
    private String birthDate;

    @NotBlank
    @Pattern(regexp = "^(MAN|WOMAN)$",
        message = "MAN이나 WOMAN 중 하나를 입력해주세요.")
    private String gender;

    @NotBlank
    @Pattern(regexp = "^(Domestic|Foreigner)$",
        message = "Domestic이나 Foreigner 중 하나를 입력해주세요.")
    private String nationality;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 전화번호 형식이 아닙니다.")
    private String phoneNum;
    
    private LocalDateTime joinDate;

    public MemberSignUpDto() {
        super();
    }
        
    public MemberSignUpDto(Long memberId, @NotBlank String loginId, Set<AuthorityDto> authorityDtoSet,
            @NotBlank @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&*!])[A-Za-z\\d@#$%^&*!]{8,20}$", message = "영문, 숫자, 특수문자를 포함하여 8~20자리로 입력해주세요.") String password,
            @NotBlank String name,
            @NotBlank @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "날짜형식(YYYY-MM-DD)을 확인해주세요.") String birthDate,
            @NotBlank @Pattern(regexp = "^(MAN|WOMAN)$", message = "MAN이나 WOMAN 중 하나를 입력해주세요.") String gender,
            @NotBlank @Pattern(regexp = "^(Domestic|Foreigner)$", message = "Domestic이나 Foreigner 중 하나를 입력해주세요.") String nationality,
            @NotBlank @Email String email,
            @NotBlank @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 전화번호 형식이 아닙니다.") String phoneNum,
            LocalDateTime joinDate) {
        super();
        this.memberId = memberId;
        this.loginId = loginId;
        this.authorityDtoSet = authorityDtoSet;
        this.password = password;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.nationality = nationality;
        this.email = email;
        this.phoneNum = phoneNum;
        this.joinDate = joinDate;
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

	public Set<AuthorityDto> getAuthorityDtoSet() {
		return authorityDtoSet;
	}

	public void setAuthorityDtoSet(Set<AuthorityDto> authorityDtoSet) {
		this.authorityDtoSet = authorityDtoSet;
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

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
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

	// from member 를 memberDto로 변환해주는 메소드
    public static MemberSignUpDto from(Member member) {
        if(member == null) return null;
        
        Set<AuthorityDto> authorityDtoSet = member.getAuthorities().stream().map(authority -> new AuthorityDto(authority.getAuthorityName()))
                .collect(Collectors.toSet());
    
        return new MemberSignUpDto(member.getMemberId(), member.getLoginId(), authorityDtoSet, null, member.getName(), member.getBirthDate().toString(), 
                member.getGender().name(), member.getNationality().name(), member.getEmail(), member.getPhoneNum(), member.getJoinDate());
    }
    
    public Member toMember() {
        Member member = new Member();
        member.setMemberId(this.memberId);
        member.setLoginId(this.loginId);
        member.setAuthorities(this.authorityDtoSet.stream().map(AuthorityDto::toAuthority).collect(Collectors.toSet()));
        member.setPassword(this.password);
        member.setName(this.name);
        member.setBirthDate(LocalDate.parse(this.birthDate));
        member.setGender(Gender.valueOf(this.gender));
        member.setNationality(Nationality.valueOf(this.nationality));
        member.setEmail(this.email);
        member.setPhoneNum(this.phoneNum);
        member.setJoinDate(this.joinDate);
        
        return member;
    }
}