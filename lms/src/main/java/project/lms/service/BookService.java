package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Book;
import project.lms.repository.BookRepository;

@Service
public class BookService {

	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		super();
		this.bookRepository = bookRepository;
	}
	
	public List<Book> getAllBooks(){
		return bookRepository.findAll();
	}
	
	public Book createBook(Book book) {
		return bookRepository.save(book);
	}
}
