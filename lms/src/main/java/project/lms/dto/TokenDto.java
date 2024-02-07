package project.lms.dto;

import java.util.Set;

public class TokenDto {

	private String token;
	
	private Set<AuthorityDto> authorities;

	public TokenDto() {
		super();
	}

	public TokenDto(String token, Set<AuthorityDto> authorities) {
		super();
		this.token = token;
		this.authorities = authorities;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Set<AuthorityDto> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<AuthorityDto> authorities) {
		this.authorities = authorities;
	}
	
}