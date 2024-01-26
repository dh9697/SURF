package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ContentDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.repository.ContentRepository;
import project.lms.repository.CourseRepository;
import project.lms.service.ContentService;

@Service
public class ContentServiceImpl implements ContentService {

	private final ContentRepository contentRepository;
	private final CourseRepository courseRepository;
	
	@Autowired
	public ContentServiceImpl(ContentRepository contentRepository, CourseRepository courseRepository) {
		super();
		this.contentRepository = contentRepository;
		this.courseRepository = courseRepository;
	}
	
	@Override
	public ResponseDto<List<Content>> getContentByCourse(Long courseId){
		List<Content> contents = contentRepository.findByCourseCourseId(courseId);
		if(contents.isEmpty()) {
			throw new InvalidRequestException("content not found", "해당 과목의 컨텐츠를 찾을 수 없습니다.");
			}
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contents,
				"과목에 등록된 컨텐츠를 조회하였습니다.");		
	}
	
	@Transactional
	public ResponseDto<Content> createContent(ContentDto contentDto) {
		try {
			Content content = new Content();
			cib
			
			
		} catch (Exception e) {
			
		}
	}
	
	@Transactional
	public ResponseDto<Content> updateContent(Long contentId, Content content) {
		
	}
	
	@Transactional
	public ResponseDto<String> deleteContent(Long contentId) {
		
	}
}
