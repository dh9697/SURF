package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
}
