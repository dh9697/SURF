package project.lms.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @ManyToOne
    @JoinColumn(name = "courseId", nullable = false)
    private Course course;

    private String bookTitle;
    
    private String authorName;

    private String publisher;

    private LocalDate publicationDate;

    private String isbn;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    private String bookThumbnail;

    // 기본 생성자
    public Book() {
    }

    // 전체 생성자
    public Book(Long bookId, Course course, String bookTitle, String authorName, String publisher,
			LocalDate publicationDate, String isbn, String description, String bookThumbnail) {
		super();
		this.bookId = bookId;
		this.course = course;
		this.bookTitle = bookTitle;
		this.authorName = authorName;
		this.publisher = publisher;
		this.publicationDate = publicationDate;
		this.isbn = isbn;
		this.description = description;
		this.bookThumbnail = bookThumbnail;
	}
    
    // Getters and Setters
	public Long getBookId() {
		return bookId;
	}

	public void setBookId(Long bookId) {
		this.bookId = bookId;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public LocalDate getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(LocalDate publicationDate) {
		this.publicationDate = publicationDate;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBookThumbnail() {
		return bookThumbnail;
	}

	public void setBookThumbnail(String bookThumbnail) {
		this.bookThumbnail = bookThumbnail;
	}
    
}