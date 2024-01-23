package project.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	@EntityGraph(attributePaths = "authorities")
	Optional<Member> findOneWithAuthoritiesByLoginId(String LoginId);
	
	List<Member> findAllByAuthorities_AuthorityName(String AuthorityName);
	
	Member findByLoginId(String loginId);
}
