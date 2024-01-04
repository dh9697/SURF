package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Content;
import project.lms.repository.ContentRepository;

@Service
public class ContentService {

	private final ContentRepository contentRepository;

	public ContentService(ContentRepository contentRepository) {
		super();
		this.contentRepository = contentRepository;
	}
	
	public List<Content> getAllContents(){
		return contentRepository.findAll();
	}
	
	public Content createContent(Content content) {
		return contentRepository.save(content);
	}
}
