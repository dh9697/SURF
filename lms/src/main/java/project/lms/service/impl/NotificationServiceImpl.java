package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Notification;
import project.lms.model.Member;
import project.lms.model.Course;
import project.lms.repository.NotificationRepository;
import project.lms.service.NotificationService;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // 특정 회원에게 보낸 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getNotificationsByMember(Member member) {
        List<Notification> notifications = notificationRepository.findByReceiver(member);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 코스에 대한 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getNotificationsByCourse(Course course) {
        List<Notification> notifications = notificationRepository.findByCourse(course);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 회원에게 보낸 읽지 않은 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getUnreadNotificationsByMember(Member member) {
        List<Notification> notifications = notificationRepository.findByReceiverAndIsRead(member, false);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 회원에게 보낸 특정 유형의 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getNotificationsByMemberAndType(Member member, String notificationType) {
        List<Notification> notifications = notificationRepository.findByReceiverAndNotificationType(member, notificationType);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 회원에게 보낸 특정 유형의 읽지 않은 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getUnreadNotificationsByMemberAndType(Member member, String notificationType) {
        List<Notification> notifications = notificationRepository.findByReceiverAndNotificationTypeAndIsRead(member, notificationType, false);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 새로운 알림을 저장
    @Transactional
    @Override
    public ResponseDto<Notification> saveNotification(Notification notification) {
        try {
            Notification savedNotification = notificationRepository.save(notification);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), savedNotification, "알림을 성공적으로 저장하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("알림 저장 중 오류가 발생하였습니다.", e.getMessage());
        }
    }

    // 특정 알림을 삭제
    @Transactional
    @Override
    public ResponseDto<Void> deleteNotification(Long notificationId) {
        try {
            notificationRepository.deleteById(notificationId);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "알림을 성공적으로 삭제하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("알림 삭제 중 오류가 발생하였습니다.", e.getMessage());
        }
    }

    // 특정 코스에 대한 읽지 않은 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getUnreadNotificationsByCourse(Course course) {
        List<Notification> notifications = notificationRepository.findByCourseAndIsRead(course, false);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 코스에 대한 특정 유형의 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getNotificationsByCourseAndType(Course course, String notificationType) {
        List<Notification> notifications = notificationRepository.findByCourseAndNotificationType(course, notificationType);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }

    // 특정 코스에 대한 특정 유형의 읽지 않은 알림 목록을 조회
    @Transactional
    @Override
    public ResponseDto<List<Notification>> getUnreadNotificationsByCourseAndType(Course course, String notificationType) {
        List<Notification> notifications = notificationRepository.findByCourseAndNotificationTypeAndIsRead(course, notificationType, false);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), notifications, "알림을 성공적으로 조회하였습니다.");
    }
    
    // admin이나 instructor가 알림을 보내는 메서드
    @Transactional
    @Override
    public ResponseDto<Notification> sendNotification(Member sender, Member receiver, String notificationText) {
        try {
            Notification notification = new Notification();
            notification.setSender(sender);
            notification.setReceiver(receiver);
            notification.setNotificationText(notificationText);
            notification.setIsRead(false);  // 처음 생성된 알림은 읽지 않은 상태이므로 false로 설정
            Notification savedNotification = notificationRepository.save(notification);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), savedNotification, "알림을 성공적으로 보냈습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("알림 전송 중 오류가 발생하였습니다.", e.getMessage());
        }
    }

}
