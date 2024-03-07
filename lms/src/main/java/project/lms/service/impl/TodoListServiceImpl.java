package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.TodoList;
import project.lms.model.Member;
import project.lms.repository.TodoListRepository;
import project.lms.service.TodoListService;

import java.util.List;
import java.util.Optional;

@Service
public class TodoListServiceImpl implements TodoListService {

    private final TodoListRepository todoListRepository;

    @Autowired
    public TodoListServiceImpl(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    // 유저의 todoList 조회
    @Override
    public ResponseDto<List<TodoList>> getTodoListByMember(Member member) {
        List<TodoList> todoList = todoListRepository.findByMember(member);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    // 유저의 todoList 저장
    @Transactional
    public ResponseDto<TodoList> saveTodoList(TodoList todoList) {
        try {
            TodoList savedTodoList = todoListRepository.save(todoList);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), savedTodoList, "TodoList를 성공적으로 저장하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("TodoList 저장 중 오류가 발생하였습니다.", e.getMessage());
        }
    }
    
    // isCompleted toggle
    @Transactional
    public ResponseDto<TodoList> updateTodoList(Long taskId, TodoList todoList) {
        Optional<TodoList> optionalTodoList = todoListRepository.findById(taskId);
        if (optionalTodoList.isPresent()) {
            TodoList existingTodoList = optionalTodoList.get();
            existingTodoList.setIsCompleted(!existingTodoList.getIsCompleted()); 
            TodoList updatedTodoList = todoListRepository.save(existingTodoList);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedTodoList, "TodoList를 성공적으로 수정하였습니다.");
        } else {
            return new ResponseDto<>(ResultCode.ERROR.name(), null, "TodoList를 찾을 수 없습니다.");
        }
    }

    // 유저의 todoList 삭제
    @Transactional
    @Override
    public ResponseDto<Void> deleteTodoList(Long taskId) {
        try {
            todoListRepository.deleteById(taskId);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "TodoList를 성공적으로 삭제하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("TodoList 삭제 중 오류가 발생하였습니다.", e.getMessage());
        }
    }

}
