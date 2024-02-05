package project.lms.service;

import java.util.List;

import project.lms.model.Announcement;
import project.lms.model.Member;

public interface AnnouncementService {
	
	// 전체 공지사항 조회
	List<Announcement> getAllAnnouncements();
	
	// 공지사항을 등록
    Announcement saveAnnouncement(Announcement announcement, Member member);
    
    // 등록된 공지사항을 수정
    Announcement updateAnnouncement(Announcement announcement, Member member);
    
    // 공지사항 Id를 이용해 해당 공지사항 Id를 가지고 있는 공지사항을 삭제
    void deleteAnnouncement(Long announcementId);
    
}