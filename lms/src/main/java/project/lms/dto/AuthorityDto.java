package project.lms.dto;

import project.lms.model.Authority;

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
	
	public Authority toAuthority() {
	    Authority authority = new Authority();
	    authority.setAuthorityName(this.authorityName);
	    return authority;
	}
	
}