package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ResponseDto;
import project.lms.model.TodoList;
import project.lms.model.Member;
import project.lms.service.TodoListService;

import java.util.List;

@RestController
@RequestMapping("/api/todolist")
@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT })
public class TodoListController {

    private final TodoListService todoListService;

    @Autowired
    public TodoListController(TodoListService todoListService) {
        this.todoListService = todoListService;
    }

    // 학생의 아이디로 해당 학생의 모든 TodoList를 조회하는 엔드포인트
    @GetMapping("/member/{memberId}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByMember(@PathVariable Long memberId) {
        Member member = new Member();
        member.setMemberId(memberId);
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByMember(member);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // TodoList를 저장하는 엔드포인트
    @PostMapping("/save")
    public ResponseEntity<ResponseDto<TodoList>> saveTodoList(@RequestBody TodoList todoList) {
        ResponseDto<TodoList> responseDto = todoListService.saveTodoList(todoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
    
    // TodoList를 수정하는 엔드포인트
    @PutMapping("/update/{taskId}")
    public ResponseEntity<ResponseDto<TodoList>> updateTodoList(@PathVariable Long taskId, @RequestBody TodoList todoList) {
        ResponseDto<TodoList> responseDto = todoListService.updateTodoList(taskId, todoList);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // TodoList를 삭제하는 엔드포인트
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<ResponseDto<Void>> deleteTodoList(@PathVariable Long taskId) {
        ResponseDto<Void> responseDto = todoListService.deleteTodoList(taskId);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
