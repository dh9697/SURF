package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {

	Authority findByAuthorityName(String name);
	
}