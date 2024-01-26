package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Content;

public interface ContentService {

	public ResponseDto<List<Content>> getContentByCourse(Long courseId);
	public ResponseDto<Content> createContent(project.lms.dto.ContentDto contentDto);
	public ResponseDto<Content> updateContent(Long contentId, project.lms.dto.ContentDto contentDto);
	public ResponseDto<String> deleteContent(Long contentId);
}
