package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import project.lms.repository.ContentHistoryRepository;
import project.lms.service.ContentService;

public class ContentHistoryServiceImpl implements ContentService {

	private ContentHistoryRepository contentHistoryRepository;

	@Autowired
	public ContentHistoryServiceImpl(ContentHistoryRepository contentHistoryRepository) {
		super();
		this.contentHistoryRepository = contentHistoryRepository;
	}
	
}
