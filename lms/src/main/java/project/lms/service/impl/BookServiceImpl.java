package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Book;
import project.lms.repository.BookRepository;
import project.lms.service.BookService;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // 모든 Book 조회
    @Transactional
    @Override
    public ResponseDto<List<Book>> getAllBooks() {
        // 모든 책 조회
        List<Book> books = bookRepository.findAll();
        // 성공적으로 책을 조회했다는 메시지와 함께 책 목록을 반환
        return new ResponseDto<>(ResultCode.SUCCESS.name(), books, "Book을 성공적으로 조회하였습니다.");
    }

    // 특정 Book 조회 by ID
    @Transactional
    @Override
    public ResponseDto<Book> getBookById(Long bookId) {
        // 주어진 ID에 해당하는 책을 조회
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        // 책이 존재하면, 성공적으로 책을 조회했다는 메시지와 함께 책 정보를 반환
        // 책이 존재하지 않으면, 책을 찾을 수 없다는 메시지를 반환
        return optionalBook.map(book -> new ResponseDto<>(ResultCode.SUCCESS.name(), book, "Book을 성공적으로 조회하였습니다."))
                .orElseGet(() -> new ResponseDto<>(ResultCode.ERROR.name(), null, "Book을 찾을 수 없습니다."));
    }

    // Book 저장
    @Transactional
    @Override
    public ResponseDto<Book> saveBook(Book book) {
        try {
            // 책 정보를 저장
            Book savedBook = bookRepository.save(book);
            // 성공적으로 책을 저장했다는 메시지와 함께 저장된 책 정보를 반환
            return new ResponseDto<>(ResultCode.SUCCESS.name(), savedBook, "Book을 성공적으로 저장하였습니다.");
        } catch (Exception e) {
            // 책 저장 중 오류가 발생하면, 예외를 발생시킴
            e.printStackTrace();
            throw new InvalidRequestException("Book 저장 중 오류가 발생하였습니다.", e.getMessage());
        }
    }
    
    // Book 업데이트
    @Override
    public ResponseDto<Book> updateBook(Long bookId, Book book) {
        // 주어진 ID에 해당하는 책을 조회
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        // 책이 존재하면, 책 정보를 업데이트하고 변경된 책 정보를 반환
        // 책이 존재하지 않으면, 책을 찾을 수 없다는 메시지를 반환
        if (optionalBook.isPresent()) {
            Book existingBook = optionalBook.get();
            existingBook.setBookTitle(book.getBookTitle());
            existingBook.setDescription(book.getDescription());
            Book updatedBook = bookRepository.save(existingBook);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedBook, "Book을 성공적으로 수정하였습니다.");
        } else {
            return new ResponseDto<>(ResultCode.ERROR.name(), null, "Book을 찾을 수 없습니다.");
        }
    }

    // Book 삭제
    @Transactional
    @Override
    public ResponseDto<String> deleteBook(Long bookId) {
        try {
            // 주어진 ID에 해당하는 책을 삭제
            bookRepository.deleteById(bookId);
            // 성공적으로 책을 삭제했다는 메시지를 반환
            return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "Book을 성공적으로 삭제하였습니다.");
        } catch (Exception e) {
            // 책 삭제 중 오류가 발생하면, 예외를 발생시킴
            e.printStackTrace();
            throw new InvalidRequestException("Book 삭제 중 오류가 발생하였습니다.", e.getMessage());
        }
    }

    // 특정 Course의 모든 Book 조회 by Course ID
    @Transactional
    @Override
    public ResponseDto<List<Book>> getBooksByCourseId(Long courseId) {
        // 주어진 강좌 ID에 해당하는 모든 책을 조회
        List<Book> books = bookRepository.findByCourse_CourseId(courseId);
        // 성공적으로 책을 조회했다는 메시지와 함께 책 목록을 반환
        return new ResponseDto<>(ResultCode.SUCCESS.name(), books, "Book을 성공적으로 조회하였습니다.");
    }
}
