package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ResponseDto;
import project.lms.model.Book;
import project.lms.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT })
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // 모든 Book을 조회
    @GetMapping
    public ResponseEntity<ResponseDto<List<Book>>> getAllBooks() {
        ResponseDto<List<Book>> responseDto = bookService.getAllBooks();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // Book 아이디로 특정 Book을 조회
    @GetMapping("/{bookId}")
    public ResponseEntity<ResponseDto<Book>> getBookById(@PathVariable Long bookId) {
        ResponseDto<Book> responseDto = bookService.getBookById(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // Book을 저장
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<Book>> saveBook(@RequestBody Book book) {
        ResponseDto<Book> responseDto = bookService.saveBook(book);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
    
    // Book을 수정
    @PutMapping("/update/{bookId}")
    public ResponseEntity<ResponseDto<Book>> updateBook(@PathVariable Long bookId, @RequestBody Book book) {
        ResponseDto<Book> responseDto = bookService.updateBook(bookId, book);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // Book을 삭제
    @DeleteMapping("/book/delete/{bookId}")
    public ResponseEntity<ResponseDto<String>> deleteBook(@PathVariable Long bookId) {
        ResponseDto<String> responseDto = bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 Course의 모든 Book을 조회
    @GetMapping("/course/{courseId}")
    public ResponseEntity<ResponseDto<List<Book>>> getBooksByCourseId(@PathVariable Long courseId) {
        ResponseDto<List<Book>> responseDto = bookService.getBooksByCourseId(courseId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
