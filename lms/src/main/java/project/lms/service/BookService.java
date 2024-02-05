package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Book;

public interface BookService {

	// Book 저장
    public ResponseDto<Book> saveBook(Book book);

    // 모든 Book 조회
    public ResponseDto<List<Book>> getAllBooks();

    // 특정 Book 조회 by ID
    public ResponseDto<Book> getBookById(Long bookId);
    
    // 특정 Course의 모든 Book 조회 by Course ID
    public ResponseDto<List<Book>> getBooksByCourseId(Long courseId);

    // Book 업데이트
    public ResponseDto<Book> updateBook(Long bookId, Book updatedBook);

    // Book 삭제
    public ResponseDto<String> deleteBook(Long bookId);
	
}