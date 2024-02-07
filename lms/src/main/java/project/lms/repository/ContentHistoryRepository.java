package project.lms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;

public interface ContentHistoryRepository extends JpaRepository<ContentHistory, Long> {
	
	List<ContentHistory> findByMember(Member member);
	
	List<ContentHistory> findByContentContentId(Long contentId);
	
	List<ContentHistory> findByIsCompletedTrue();
	
	List<ContentHistory> findByIsCompletedFalse();
	
	Long countByMemberMemberIdAndIsCompletedTrue(Long memberId); // 코드 추가

	Optional<ContentHistory> findByMemberAndContent(Member member, Content content);
	
	// 특정 강의와 회원에 대한 모든 컨텐츠 이력 조회
	List<ContentHistory> findByContent_Course_CourseIdAndMember_MemberId(Long courseId, Long memberId);

}