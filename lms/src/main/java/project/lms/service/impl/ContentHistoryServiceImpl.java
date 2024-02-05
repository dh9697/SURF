package project.lms.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

@Service
public class ContentHistoryServiceImpl implements ContentHistoryService {

	private ContentHistoryRepository contentHistoryRepository;
	private MemberRepository memberRepository;

	@Autowired
	public ContentHistoryServiceImpl(ContentHistoryRepository contentHistoryRepository, MemberRepository memberRepository) {
		super();
		this.contentHistoryRepository = contentHistoryRepository;
		this.memberRepository = memberRepository;
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
				"contentHistory를 조회하였습니다.");
	}
	
	// 컨텐츠 수강 시작
	@Transactional
	public ResponseDto<ContentHistory> startContent(Member member, Content content) {
		ContentHistory contentHistory = new ContentHistory();
		contentHistory.setMember(member);
		contentHistory.setContent(content);
		contentHistory.setLastAccessed(LocalDateTime.now());
		contentHistory.setCompleted(false);
		
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contentHistory,
				"수강을 시작하였습니다.");
	}
	
	// 컨텐츠 수강 완료
	@Transactional
	public ResponseDto<ContentHistory> completeContent(Long contentHistoryId) {
		ContentHistory contentHistory = contentHistoryRepository.findById(contentHistoryId)
				.orElseThrow(() -> new InvalidRequestException("ContentHistory not found", "contentHistory를 찾을 수 없습니다."));
        contentHistory.setLastAccessed(LocalDateTime.now());
        contentHistory.setCompleted(true);
        contentHistory = contentHistoryRepository.save(contentHistory);

        return new ResponseDto<>(
                ResultCode.SUCCESS.name(),
                contentHistory,
                "수강을 완료하였습니다.");
    }
}
