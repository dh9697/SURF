package project.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Course;
import project.lms.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	@EntityGraph(attributePaths = "authorities")
	Optional<Member> findOneWithAuthoritiesByLoginId(String LoginId);
	
	List<Member> findByTeachingCoursesContains(Course course);
	
	// 모든 강사 목록
	List<Member> findAllByAuthorities_AuthorityName(String AuthorityName);

	// 특정 Id가 강사인지 확인
	Optional<Member> findByMemberIdAndAuthorities_AuthorityName(Long memberId, String authorityName);
	
	Member findByLoginId(String loginId);
}
