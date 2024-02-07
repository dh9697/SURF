package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;
import project.lms.repository.ContentHistoryRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.ContentHistoryService;
import project.lms.util.SecurityUtil;

import java.util.List;

@Service
public class ContentHistoryServiceImpl implements ContentHistoryService {
	
	private final ContentHistoryRepository contentHistoryRepository;

	private final MemberRepository memberRepository;
	
	@Autowired
	public ContentHistoryServiceImpl(ContentHistoryRepository contentHistoryRepository, MemberRepository memberRepository) {
		super();
		this.contentHistoryRepository = contentHistoryRepository;
		this.memberRepository = memberRepository;
	}
	
	// 콘텐츠 클릭 시 ContentHistory 생성
    @Override
    public ResponseDto<ContentHistory> createContentHistory(Member member, Content content) {
        ContentHistory newContentHistory = new ContentHistory();
        newContentHistory.setMember(member);
        newContentHistory.setContent(content);
        newContentHistory.setIsCompleted(false);

        contentHistoryRepository.save(newContentHistory);

        return new ResponseDto<>(
            ResultCode.SUCCESS.name(),
            newContentHistory,
            "ContentHistory가 생성되었습니다."
        );
    }

    // 학습 완료 버튼 클릭 시 isCompleted 필드 업데이트
    @Override
    public ResponseDto<ContentHistory> completeContentHistory(Member member, Content content) {
        ContentHistory existingContentHistory = contentHistoryRepository.findByMemberAndContent(member, content)
            .orElseThrow(() -> new InvalidRequestException("not found contentHistory", "ContentHistory를 찾을 수 없습니다."));

        existingContentHistory.setIsCompleted(true);
        contentHistoryRepository.save(existingContentHistory);

        return new ResponseDto<>(
            ResultCode.SUCCESS.name(),
            existingContentHistory,
            "ContentHistory의 isCompleted가 업데이트되었습니다."
        );
    }

	// 전체 조회
	@Override
	public ResponseDto<List<ContentHistory>> getAllContentHistories(){
		List<ContentHistory> contentHistories = contentHistoryRepository.findAll();
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contentHistories,
				"모든 contentHistory를 조회하였습니다.");
	}
	
	// 콘텐츠별 조회
	@Override
	public ResponseDto<List<ContentHistory>> getContentHistoriesByContent(Long contentId){
		List<ContentHistory> contentHistories = contentHistoryRepository.findByContentContentId(contentId);
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contentHistories,
				"contentHistory를 content에 따라 조회하였습니다.");
	}
	
	// 완료된 학습 이력 조회
	@Override
	public ResponseDto<List<ContentHistory>> getCompletedContentHistories(){
		List<ContentHistory> contentHistories = contentHistoryRepository.findByIsCompletedTrue();
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contentHistories,
				"완료된 학습 이력을 조회하였습니다.");
	}
	
	// 완료되지 않은 학습 이력 조회
	@Override
	public ResponseDto<List<ContentHistory>> getIncompleteContentHistories(){
		List<ContentHistory> contentHistories = contentHistoryRepository.findByIsCompletedFalse();
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contentHistories,
				"완료되지 않은 학습 이력을 조회하였습니다.");
	}
	
	// 로그인 유저의 조회
		private Member getCurrentUser() {
	        String username = SecurityUtil.getCurrentloginId()
	                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
	        
	        return memberRepository.findByLoginId(username);
	    }
		
		@Override
		public ResponseDto<List<ContentHistory>> getMyContentHistories() {
			Member member = getCurrentUser();
			List<ContentHistory> contentHistories = contentHistoryRepository.findByMember(member);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					contentHistories,
					"로그인한 사용자가 학습 중인 contentHistory를 조회하였습니다.");
		}

}