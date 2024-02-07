package project.lms.service;

import java.util.List;

import project.lms.dto.ExamHistoryDto;
import project.lms.dto.ResponseDto;

public interface ExamHistoryService {
	
    // 시험 이력 생성 메서드
    ResponseDto<ExamHistoryDto> createExamHistory(ExamHistoryDto examHistoryDto);
    
    // 특정 시험 이력 조회 메서드
    ResponseDto<ExamHistoryDto> getExamHistory(Long id);
    
    // 모든 시험 이력 조회 메서드
    ResponseDto<List<ExamHistoryDto>> getAllExamHistories();
    
    // 특정 회원의 시험 이력 조회 메서드
    ResponseDto<List<ExamHistoryDto>> getExamHistoriesByMemberId(Long memberId);
    
    // 특정 시험 이력 수정 메서드
    ResponseDto<ExamHistoryDto> updateExamHistory(Long examHistoryId, ExamHistoryDto examHistoryDto);
    
    // 특정 시험 이력 삭제 메서드
    ResponseDto<String> deleteExamHistory(Long examHistoryId);
    
}