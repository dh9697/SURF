package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

	// 교재 제목으로 검색
    List<Book> findByBookTitle(String bookTitle);
    
    // 저자 이름으로 검색
    List<Book> findByAuthorName(String authorName);
    
    // ISBN 번호로 검색
    List<Book> findByIsbn(String isbn);
    
    // Course ID로 검색
    List<Book> findByCourse_CourseId(Long courseId);
    
}