package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Announcement;
import project.lms.model.Member;

import java.time.LocalDateTime;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // 특정 사용자가 작성한 공지사항 조회
    List<Announcement> findByMember(Member member);
    
    // 특정 기간 동안 작성된 공지사항 조회
    List<Announcement> findByAnnouncementDateBetween(LocalDateTime start, LocalDateTime end);
    
    // 중요 공지사항 조회
    List<Announcement> findByIsImportantTrue();
    
    // 문자열이 포함된 공지사항 조회
    List<Announcement> findByAnnouncementTextContaining(String text);
}
