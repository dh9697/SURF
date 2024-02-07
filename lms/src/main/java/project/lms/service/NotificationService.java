package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.Notification;
import project.lms.model.Member;
import project.lms.model.Course;

import java.util.List;

public interface NotificationService {

    // 특정 회원의 모든 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getNotificationsByMember(Member member);

    // 특정 강좌의 모든 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getNotificationsByCourse(Course course);

    // 읽지 않은 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getUnreadNotificationsByMember(Member member);

    // 특정 타입의 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getNotificationsByMemberAndType(Member member, String notificationType);

    // 특정 타입의 읽지 않은 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getUnreadNotificationsByMemberAndType(Member member, String notificationType);

    // 알림을 저장하는 메서드
    ResponseDto<Notification> saveNotification(Notification notification);

    // 알림을 삭제하는 메서드
    ResponseDto<Void> deleteNotification(Long notificationId);

    // 특정 강좌의 읽지 않은 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getUnreadNotificationsByCourse(Course course);

    // 특정 강좌의 특정 타입의 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getNotificationsByCourseAndType(Course course, String notificationType);

    // 특정 강좌의 특정 타입의 읽지 않은 알림을 가져오는 메서드
    ResponseDto<List<Notification>> getUnreadNotificationsByCourseAndType(Course course, String notificationType);

    // admin이나 instructor가 알림을 보내는 메서드
    ResponseDto<Notification> sendNotification(Member sender, Member receiver, String notificationText);
}
