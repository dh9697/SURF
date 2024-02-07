package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ResponseDto;
import project.lms.model.Notification;
import project.lms.model.Member;
import project.lms.model.Course;
import project.lms.service.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT })
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // 특정 회원에게 보낸 알림 목록을 조회하는 엔드포인트
    @GetMapping("/member/{memberId}")
    public ResponseEntity<ResponseDto<List<Notification>>> getNotificationsByMember(@PathVariable Long memberId) {
        Member member = new Member();
        member.setMemberId(memberId);
        ResponseDto<List<Notification>> responseDto = notificationService.getNotificationsByMember(member);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 코스에 대한 알림 목록을 조회하는 엔드포인트
    @GetMapping("/course/{courseId}")
    public ResponseEntity<ResponseDto<List<Notification>>> getNotificationsByCourse(@PathVariable Long courseId) {
        Course course = new Course();
        course.setCourseId(courseId);
        ResponseDto<List<Notification>> responseDto = notificationService.getNotificationsByCourse(course);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 회원에게 보낸 읽지 않은 알림 목록을 조회하는 엔드포인트
    @GetMapping("/member/{memberId}/unread")
    public ResponseEntity<ResponseDto<List<Notification>>> getUnreadNotificationsByMember(@PathVariable Long memberId) {
        Member member = new Member();
        member.setMemberId(memberId);
        ResponseDto<List<Notification>> responseDto = notificationService.getUnreadNotificationsByMember(member);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 회원에게 보낸 특정 유형의 알림 목록을 조회하는 엔드포인트
    @GetMapping("/member/{memberId}/type/{notificationType}")
    public ResponseEntity<ResponseDto<List<Notification>>> getNotificationsByMemberAndType(@PathVariable Long memberId, @PathVariable String notificationType) {
        Member member = new Member();
        member.setMemberId(memberId);
        ResponseDto<List<Notification>> responseDto = notificationService.getNotificationsByMemberAndType(member, notificationType);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 새로운 알림을 저장하는 엔드포인트
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<Notification>> saveNotification(@RequestBody Notification notification) {
        ResponseDto<Notification> responseDto = notificationService.saveNotification(notification);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 알림을 삭제하는 엔드포인트
    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<ResponseDto<Void>> deleteNotification(@PathVariable Long notificationId) {
        ResponseDto<Void> responseDto = notificationService.deleteNotification(notificationId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 코스에 대한 읽지 않은 알림 목록을 조회하는 엔드포인트
    @GetMapping("/course/{courseId}/unread")
    public ResponseEntity<ResponseDto<List<Notification>>> getUnreadNotificationsByCourse(@PathVariable Long courseId) {
        Course course = new Course();
        course.setCourseId(courseId);
        ResponseDto<List<Notification>> responseDto = notificationService.getUnreadNotificationsByCourse(course);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 코스에 대한 특정 유형의 알림 목록을 조회하는 엔드포인트
    @GetMapping("/course/{courseId}/type/{notificationType}")
    public ResponseEntity<ResponseDto<List<Notification>>> getNotificationsByCourseAndType(@PathVariable Long courseId, @PathVariable String notificationType) {
        Course course = new Course();
        course.setCourseId(courseId);
        ResponseDto<List<Notification>> responseDto = notificationService.getNotificationsByCourseAndType(course, notificationType);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 코스에 대한 특정 유형의 읽지 않은 알림 목록을 조회하는 엔드포인트
    @GetMapping("/course/{courseId}/type/{notificationType}/unread")
    public ResponseEntity<ResponseDto<List<Notification>>> getUnreadNotificationsByCourseAndType(@PathVariable Long courseId, @PathVariable String notificationType) {
        Course course = new Course();
        course.setCourseId(courseId);
        ResponseDto<List<Notification>> responseDto = notificationService.getUnreadNotificationsByCourseAndType(course, notificationType);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // admin이나 instructor가 알림을 보내는 엔드포인트
    @PostMapping("/send")
    public ResponseEntity<ResponseDto<Notification>> sendNotification(@RequestBody Member sender, @RequestBody Member receiver, @RequestBody String notificationText) {
        ResponseDto<Notification> responseDto = notificationService.sendNotification(sender, receiver, notificationText);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

}
