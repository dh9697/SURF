package project.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
	
	@EntityGraph(attributePaths = "authorities")
	Optional<Member> findOneWithAuthoritiesByLoginId(String LoginId);
	
	// 로그인Id가 강사인지 확인
	Optional<Member> findByLoginIdAndAuthorities_AuthorityName(String loginId, String authorityName);
	
	// 모든 강사 목록 -> course에서 부르고 courseId와 매칭되는지
	List<Member> findAllByAuthorities_AuthorityName(String AuthorityName);
	
	// courseId로 멤버 정보 찾기
	List<Member> findByTeachingCourses_CourseId(Long courseId);
	
	Member findByLoginId(String loginId);
}