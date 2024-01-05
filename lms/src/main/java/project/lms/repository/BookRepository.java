package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
