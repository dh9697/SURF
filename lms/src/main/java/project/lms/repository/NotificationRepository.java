package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // 특정 회원이 받은 알림을 조회하는 메서드
    List<Notification> findByReceiver(Member receiver);

    // 특정 회원이 보낸 알림을 조회하는 메서드
    List<Notification> findBySender(Member sender);

    // 특정 회원이 받은 읽지 않은 알림을 조회하는 메서드
    List<Notification> findByReceiverAndIsRead(Member receiver, Boolean isRead);
    
    // 특정 회원이 받은 특정 타입의 알림을 조회하는 메서드
    List<Notification> findByReceiverAndNotificationType(Member receiver, String notificationType);

    // 특정 회원이 받은 특정 타입의 읽지 않은 알림을 조회하는 메서드
    List<Notification> findByReceiverAndNotificationTypeAndIsRead(Member receiver, String notificationType, Boolean isRead);

    // 특정 강좌의 알림을 조회하는 메서드
    List<Notification> findByCourse(Course course);

    // 특정 강좌의 읽지 않은 알림을 조회하는 메서드
    List<Notification> findByCourseAndIsRead(Course course, Boolean isRead);

    // 특정 강좌의 특정 타입의 알림을 조회하는 메서드
    List<Notification> findByCourseAndNotificationType(Course course, String notificationType);

    // 특정 강좌의 특정 타입의 읽지 않은 알림을 조회하는 메서드
    List<Notification> findByCourseAndNotificationTypeAndIsRead(Course course, String notificationType, Boolean isRead);
}
