package project.lms.dto;

public class AuthorityDto {

	private String authorityName;

	public AuthorityDto() {
		super();
	}

	public AuthorityDto(String authorityName) {
		super();
		this.authorityName = authorityName;
	}

	public String getAuthorityName() {
		return authorityName;
	}

	public void setAuthorityName(String authorityName) {
		this.authorityName = authorityName;
	}
	
}
