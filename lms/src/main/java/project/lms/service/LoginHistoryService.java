package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.LoginHistory;
import java.util.List;

public interface LoginHistoryService {
    // 전체 회원의 로그인 이력을 조회하고, 로그인 시간을 기준으로 내림차순 정렬하는 메서드
    ResponseDto<List<LoginHistory>> getAllLoginHistories();

    // 전체 회원의 가장 최근 로그인 이력을 조회하는 메서드
    ResponseDto<LoginHistory> getLatestLoginHistory();

    // 로그인 이력을 저장하는 메서드. LoginHistory 객체를 받아서 저장.
    LoginHistory save(LoginHistory loginHistory);
}
