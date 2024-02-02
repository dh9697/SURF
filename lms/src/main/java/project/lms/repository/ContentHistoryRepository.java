package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.ContentHistory;

public interface ContentHistoryRepository extends JpaRepository<ContentHistory, Long>{

}
