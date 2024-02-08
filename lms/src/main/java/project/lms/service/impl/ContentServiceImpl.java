package project.lms.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ContentDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.model.Course;
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
	
	// course에 따라 content 조회
	@Override
	public ResponseDto<List<Content>> getContentByCourse(Long courseId){
		Optional<Course> course = courseRepository.findById(courseId);
		List<Content> contents = contentRepository.findByCourse(course.get());
		if(contents.isEmpty()) {
			throw new InvalidRequestException("content not found", "해당 과목의 컨텐츠를 찾을 수 없습니다.");
			}
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				contents,
				"과목에 등록된 컨텐츠를 조회하였습니다.");		
	}
	
	// course에 따라 content 생성
	@Transactional
	public ResponseDto<Content> createContent(Long courseId, ContentDto contentDto) {
	    try {
	        Optional<Course> optionalCourse = courseRepository.findById(courseId);
	        
	        if (!optionalCourse.isPresent()) {
	            throw new InvalidRequestException("course not found", "해당 과목을 찾을 수 없습니다.");
	        }
	        
	        Course course = optionalCourse.get();
	        
	        Content content = new Content();
	        content.setContentTitle(contentDto.getContentTitle());
	        content.setDescription(contentDto.getDescription());
	        content.setContentDuration(contentDto.getContentDuration());
	        content.setContentImg(contentDto.getContentImg());
	        content.setCourse(course);
	        
	        Content createdContent = contentRepository.save(content);
	        
	        return new ResponseDto<>(
	            ResultCode.SUCCESS.name(),
	            createdContent,
	            "컨텐츠를 생성하였습니다."
	        );
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseDto<>(
	            ResultCode.ERROR.name(),
	            null,
	            "컨텐츠 생성에 실패하였습니다."
	        );
	    }
	}

	// 컨텐츠마다 수정
	@Transactional
	public ResponseDto<Content> updateContent(Long contentId, ContentDto contentDto) {
		try {
			Content content = contentRepository.findById(contentId)
					.orElseThrow(() -> new InvalidRequestException("not found content", "해당 컨텐츠가 존재하지 않거나 찾을 수 없습니다."));
			
			content.setContentTitle(contentDto.getContentTitle());
			content.setContentImg(contentDto.getContentImg());
			content.setContentDuration(contentDto.getContentDuration());
			content.setDescription(contentDto.getDescription());
			
			Content updatedContent = contentRepository.save(content);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					updatedContent,
					"컨텐츠를 업데이트하였습니다.");
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"컨텐츠 업데이트에 실패하였습니다.");
		}
	}
	
	// 컨텐츠마다 삭제
	@Transactional
	public ResponseDto<String> deleteContent(Long contentId) {
		try {
			Content content = contentRepository.findById(contentId)
					.orElseThrow(() -> new InvalidRequestException("not found content", "해당 컨텐츠가 존재하지 않거나 찾을 수 없습니다."));
		
			contentRepository.delete(content);
			
			return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					null,
					"컨텐츠를 삭제하였습니다.");
			
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseDto<>(
					ResultCode.ERROR.name(),
					null,
					"컨텐츠 삭제에 실패하였습니다.");
		}
	}
}