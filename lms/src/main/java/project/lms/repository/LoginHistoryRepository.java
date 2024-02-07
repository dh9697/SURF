package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.lms.model.LoginHistory;
import java.util.List;

public interface LoginHistoryRepository extends JpaRepository<LoginHistory, Long> {
    
    // 전체 회원의 로그인 이력을 조회하고, 로그인 시간을 기준으로 내림차순 정렬하는 메서드
    List<LoginHistory> findAllByOrderByLoginTimeDesc();

    // 전체 회원의 가장 최근 로그인 이력을 조회하는 메서드
    LoginHistory findTopByOrderByLoginTimeDesc();
}
