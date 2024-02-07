package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.lms.model.Member;
import project.lms.model.TodoList;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {

    // 학생의 아이디로 해당 학생의 모든 TodoList를 가져오는 메서드
    List<TodoList> findByMember(Member member);

    // 특정 우선순위의 TodoList를 가져오는 메서드
    List<TodoList> findByPriority(Integer priority);

    // 완료 여부에 따라 TodoList를 가져오는 메서드
    List<TodoList> findByIsCompleted(Boolean isCompleted);

    // 특정 날짜 이전의 마감일이 지나지 않은 TodoList를 가져오는 메서드
    List<TodoList> findByDueDateAfterAndIsCompletedFalse(LocalDateTime currentDate);

    // 특정 날짜 이후의 완료된 TodoList를 가져오는 메서드
    List<TodoList> findByCompletionDateAfterAndIsCompletedTrue(LocalDate completionDate);

    // 특정 학생과 우선순위, 완료 여부에 따라 TodoList를 가져오는 메서드
    List<TodoList> findByMemberAndPriorityAndIsCompleted(Member member, Integer priority, Boolean isCompleted);
    
    // TodoList를 우선순위에 따라 내림차순으로 정렬하여 가져오는 쿼리 메서드
    List<TodoList> findAllByOrderByPriorityDesc();

}
