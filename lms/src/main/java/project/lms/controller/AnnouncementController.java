package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import project.lms.model.Announcement;
import project.lms.model.Member;
import project.lms.repository.MemberRepository;
import project.lms.service.AnnouncementService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;

@RestController
@RequestMapping("/api/announcement")
@CrossOrigin(origins="http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class AnnouncementController {

    private final AnnouncementService announcementService;
    
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        return new ResponseEntity<>(announcements, HttpStatus.OK);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Announcement> saveAnnouncement(@RequestBody Announcement announcement) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Member member = memberRepository.findByLoginId(username); // findByUsername에서 findByLoginId로 변경
        Announcement savedAnnouncement = announcementService.saveAnnouncement(announcement, member);
        return new ResponseEntity<>(savedAnnouncement, HttpStatus.CREATED);
    }

    @PutMapping("/update/{announcementId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable Long announcementId, @RequestBody Announcement announcement) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Member member = memberRepository.findByLoginId(username);

        // 업데이트된 공지사항을 반환하도록 수정
        Announcement updatedAnnouncement = announcementService.updateAnnouncement(announcement, member);

        return new ResponseEntity<>(updatedAnnouncement, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{announcementId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable Long announcementId) {
        announcementService.deleteAnnouncement(announcementId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
