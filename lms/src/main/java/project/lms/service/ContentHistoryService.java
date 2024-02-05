package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Content;
import project.lms.model.ContentHistory;
import project.lms.model.Member;

public interface ContentHistoryService {

	public ResponseDto<List<ContentHistory>> getMyContentHistories();
	public ResponseDto<ContentHistory> startContent(Member member, Content content);
	public ResponseDto<ContentHistory> completeContent(Long contentHistoryId);
	
}
