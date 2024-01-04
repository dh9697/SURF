package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {

}
