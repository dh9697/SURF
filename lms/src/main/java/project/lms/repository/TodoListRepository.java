package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.lms.model.Member;
import project.lms.model.TodoList;

import java.util.List;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {

    // 학생의 아이디로 해당 학생의 모든 TodoList를 가져오는 메서드
    List<TodoList> findByMember(Member member);
}
