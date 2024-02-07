package project.lms.service;

import java.util.List;

import project.lms.dto.ContentDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Content;

public interface ContentService {

	public ResponseDto<List<Content>> getContentByCourse(Long courseId);
	
	public ResponseDto<Content> createContent(Long courseId, ContentDto contentDto);
	
	public ResponseDto<Content> updateContent(Long contentId, ContentDto contentDto);
	
	public ResponseDto<String> deleteContent(Long contentId);
	
}