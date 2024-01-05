package project.lms.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table (name = "books")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bookId;
	
	@ManyToOne
	@JoinColumn(name = "courseId")
	private Course course;
	
	@Column
	private String bookTitle;
	
	@Column
	private String authorName;
	
	@Column
	private String publisher;
	
	@Column
	@Temporal(TemporalType.DATE)
	private Date publicationDate;
	
	@Column
	private String isbn;
	
	@Column
	private String description;
	
	@Column
	private String bookThumnail;

	public Book() {
		super();
	}

	public Book(Long bookId, Course course, String bookTitle, String authorName, String publisher, Date publicationDate,
			String isbn, String description, String bookThumnail) {
		super();
		this.bookId = bookId;
		this.course = course;
		this.bookTitle = bookTitle;
		this.authorName = authorName;
		this.publisher = publisher;
		this.publicationDate = publicationDate;
		this.isbn = isbn;
		this.description = description;
		this.bookThumnail = bookThumnail;
	}

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

	public Date getPublicationDate() {
		return publicationDate;
	}

	public void setPublicationDate(Date publicationDate) {
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

	public String getBookThumnail() {
		return bookThumnail;
	}

	public void setBookThumnail(String bookThumnail) {
		this.bookThumnail = bookThumnail;
	}
	
}
