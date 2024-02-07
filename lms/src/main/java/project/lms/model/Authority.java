package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "authority")
public class Authority {
	@Id
	@Column(name = "authorityName", length = 50)
	private String authorityName;
	
	public Authority() {
		super();
	}

	public Authority(String authorityName) {
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