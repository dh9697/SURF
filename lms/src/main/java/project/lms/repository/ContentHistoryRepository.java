package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ContentHistory;
import project.lms.model.Member;

public interface ContentHistoryRepository extends JpaRepository<ContentHistory, Long>{

	List<ContentHistory> findByMember(Member member);
	
	Long countByMemberMemberIdAndIsCompletedTrue(Long memberId);
}
