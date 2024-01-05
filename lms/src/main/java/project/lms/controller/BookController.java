package project.lms.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.Book;
import project.lms.service.BookService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class BookController {

	private final BookService bookService;

	public BookController(BookService bookService) {
		super();
		this.bookService = bookService;
	}
	
	@GetMapping("/book")
	public List<Book> getAllBooks(){
		return bookService.getAllBooks();
	}
	
	@PostMapping("/book")
	public Book create(@RequestBody Book book) {
		return bookService.createBook(book);
	}
}
