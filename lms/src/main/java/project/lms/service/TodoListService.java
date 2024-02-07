package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.TodoList;
import project.lms.model.Member;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TodoListService {

    // 학생의 아이디로 해당 학생의 모든 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByMember(Member member);

    // TodoList 아이디로 특정 TodoList를 가져오는 메서드
    ResponseDto<TodoList> getTodoListById(Long taskId);

    // TodoList를 저장하는 메서드
    ResponseDto<TodoList> saveTodoList(TodoList todoList);
    
    // TodoList를 수정하는 메서드
    ResponseDto<TodoList> updateTodoList(Long taskId, TodoList todoList);

    // TodoList를 삭제하는 메서드
    ResponseDto<Void> deleteTodoList(Long taskId);

    // 특정 우선순위의 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByPriority(Integer priority);

    // 완료 여부에 따라 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByIsCompleted(Boolean isCompleted);

    // 특정 날짜 이전의 마감일이 지나지 않은 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByDueDateAfterAndIsCompletedFalse(LocalDateTime currentDate);

    // 특정 날짜 이후의 완료된 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByCompletionDateAfterAndIsCompletedTrue(LocalDate completionDate);

    // 특정 학생과 우선순위, 완료 여부에 따라 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByMemberAndPriorityAndIsCompleted(Member member, Integer priority, Boolean isCompleted);

    // TodoList를 우선순위에 따라 정렬하여 가져오는 메서드
    ResponseDto<List<TodoList>> getAllTodoListsSortedByPriority();

}
