package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.TodoList;
import project.lms.model.Member;

import java.util.List;

public interface TodoListService {

    // 학생의 아이디로 해당 학생의 모든 TodoList를 가져오는 메서드
    ResponseDto<List<TodoList>> getTodoListByMember(Member member);

    // TodoList를 저장하는 메서드
    ResponseDto<TodoList> saveTodoList(TodoList todoList);
    
    // TodoList를 수정하는 메서드
    ResponseDto<TodoList> updateTodoList(Long taskId, TodoList todoList);

    // TodoList를 삭제하는 메서드
    ResponseDto<Void> deleteTodoList(Long taskId);

}
