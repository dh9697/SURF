package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;

public interface ContentHistoryService {
	
	// 모든 학습 이력 조회
	public ResponseDto<List<ContentHistory>> getAllContentHistories();
	
	// 특정 콘텐츠 ID에 대한 학습 이력 조회
	public ResponseDto<List<ContentHistory>> getContentHistoriesByContent(Long contentId);
	
	// 특정 회원의 학습 이력 조회
	public ResponseDto<List<ContentHistory>> getMyContentHistories();

	// 완료된 학습 이력 조회
    public ResponseDto<List<ContentHistory>> getCompletedContentHistories();

    // 완료되지 않은 학습 이력 조회
    public ResponseDto<List<ContentHistory>> getIncompleteContentHistories();
    
    // 콘텐츠 클릭 시 ContentHistory 생성
    public ResponseDto<ContentHistory> createContentHistory(Long memberId, Long contentId);

    // 학습 완료 버튼 클릭 시 isCompleted 필드 업데이트
    public ResponseDto<ContentHistory> completeContentHistory(Long memberId, Long contentId);
    
}