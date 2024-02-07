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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TodoListServiceImpl implements TodoListService {

    private final TodoListRepository todoListRepository;

    @Autowired
    public TodoListServiceImpl(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    @Override
    public ResponseDto<List<TodoList>> getTodoListByMember(Member member) {
        List<TodoList> todoList = todoListRepository.findByMember(member);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    @Override
    public ResponseDto<TodoList> getTodoListById(Long taskId) {
        Optional<TodoList> optionalTodoList = todoListRepository.findById(taskId);
        return optionalTodoList.map(todoList -> new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다."))
                .orElseGet(() -> new ResponseDto<>(ResultCode.ERROR.name(), null, "TodoList를 찾을 수 없습니다."));
    }

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
    
    @Transactional
    public ResponseDto<TodoList> updateTodoList(Long taskId, TodoList todoList) {
        Optional<TodoList> optionalTodoList = todoListRepository.findById(taskId);
        if (optionalTodoList.isPresent()) {
            TodoList existingTodoList = optionalTodoList.get();
            existingTodoList.setTaskName(todoList.getTaskName()); // 수정된 부분
            existingTodoList.setDescription(todoList.getDescription());
            TodoList updatedTodoList = todoListRepository.save(existingTodoList);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedTodoList, "TodoList를 성공적으로 수정하였습니다.");
        } else {
            return new ResponseDto<>(ResultCode.ERROR.name(), null, "TodoList를 찾을 수 없습니다.");
        }
    }


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

    @Transactional
    @Override
    public ResponseDto<List<TodoList>> getTodoListByPriority(Integer priority) {
        List<TodoList> todoList = todoListRepository.findByPriority(priority);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    @Transactional
    @Override
    public ResponseDto<List<TodoList>> getTodoListByIsCompleted(Boolean isCompleted) {
        List<TodoList> todoList = todoListRepository.findByIsCompleted(isCompleted);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    @Transactional
    @Override
    public ResponseDto<List<TodoList>> getTodoListByDueDateAfterAndIsCompletedFalse(LocalDateTime currentDate) {
        List<TodoList> todoList = todoListRepository.findByDueDateAfterAndIsCompletedFalse(currentDate);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    @Transactional
    @Override
    public ResponseDto<List<TodoList>> getTodoListByCompletionDateAfterAndIsCompletedTrue(LocalDate completionDate) {
        List<TodoList> todoList = todoListRepository.findByCompletionDateAfterAndIsCompletedTrue(completionDate);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }

    @Transactional
    @Override
    public ResponseDto<List<TodoList>> getTodoListByMemberAndPriorityAndIsCompleted(Member member, Integer priority, Boolean isCompleted) {
        List<TodoList> todoList = todoListRepository.findByMemberAndPriorityAndIsCompleted(member, priority, isCompleted);
        return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
    }
    
    @Override
    // TodoList를 우선순위에 따라 정렬하여 가져오는 메서드 구현
    public ResponseDto<List<TodoList>> getAllTodoListsSortedByPriority() {
    // TodoListRepository의 findAllByOrderByPriorityDesc 메서드를 호출하여
    // 우선순위에 따라 내림차순으로 정렬된 TodoList를 가져옴
    List<TodoList> todoList = todoListRepository.findAllByOrderByPriorityDesc();
    // 정렬된 TodoList와 메시지를 포함하는 ResponseDto를 반환
    return new ResponseDto<>(ResultCode.SUCCESS.name(), todoList, "TodoList를 성공적으로 조회하였습니다.");
 }


}
