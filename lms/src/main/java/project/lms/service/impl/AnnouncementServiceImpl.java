package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.model.Announcement;
import project.lms.model.Member;
import project.lms.repository.AnnouncementRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.AnnouncementService;
import project.lms.service.NotificationService;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {
	
	@Autowired
    private AnnouncementRepository announcementRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private MemberRepository memberRepository;
    
    // 전체 공지사항 조회
    @Override
    public List<Announcement> getAllAnnouncements() { 
        return announcementRepository.findAll();
    }

    // 공지사항을 등록
    @Transactional
    @Override
    public Announcement saveAnnouncement(Announcement announcement, Member member) {
        announcement.setMember(member);
        Announcement savedAnnouncement = announcementRepository.save(announcement);

        // 공지사항 등록 알림 전송 로직
        sendNotificationToAllUsers(member, "새로운 공지사항이 등록되었습니다.");

        return savedAnnouncement;
    }

    // 공지사항 수정
    @Transactional
    @Override
    public Announcement updateAnnouncement(Announcement announcement, Member member) {
        Announcement existingAnnouncement = announcementRepository.findById(announcement.getAnnouncementId())
                .orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 존재하지 않습니다."));

        existingAnnouncement.setAnnouncementText(announcement.getAnnouncementText());
        existingAnnouncement.setAnnouncementDate(announcement.getAnnouncementDate());
        existingAnnouncement.setIsImportant(announcement.getIsImportant());
        Announcement updatedAnnouncement = announcementRepository.save(existingAnnouncement);

        // 공지사항 수정 알림 전송 로직
        sendNotificationToAllUsers(member, "공지사항이 수정되었습니다.");

        return updatedAnnouncement;
    }
    
    // 공지사항 삭제
    @Override
    public void deleteAnnouncement(Long announcementId) { 
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new IllegalArgumentException("해당 공지사항이 존재하지 않습니다."));
        announcementRepository.delete(announcement);
    }

    // 공지사항 등록 혹은 수정 시 회원들에게 알림 전송
    private void sendNotificationToAllUsers(Member sender, String notificationText) {
        List<Member> members = memberRepository.findAll(); // 모든 회원 조회
        for (Member receiver : members) {
            notificationService.sendNotification(sender, receiver, notificationText); // 각 회원에게 알림 보내기
        }
    }
}