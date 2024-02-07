package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.ResponseDto;
import project.lms.model.TodoList;
import project.lms.model.Member;
import project.lms.service.TodoListService;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    // TodoList 아이디로 특정 TodoList를 조회하는 엔드포인트
    @GetMapping("/{taskId}")
    public ResponseEntity<ResponseDto<TodoList>> getTodoListById(@PathVariable Long taskId) {
        ResponseDto<TodoList> responseDto = todoListService.getTodoListById(taskId);
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

    // 특정 우선순위의 TodoList를 조회하는 엔드포인트
    @GetMapping("/priority/{priority}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByPriority(@PathVariable Integer priority) {
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByPriority(priority);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 완료 여부에 따라 TodoList를 조회하는 엔드포인트
    @GetMapping("/completed/{isCompleted}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByIsCompleted(@PathVariable Boolean isCompleted) {
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByIsCompleted(isCompleted);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 날짜 이전의 마감일이 지나지 않은 TodoList를 조회하는 엔드포인트
    @GetMapping("/due/{currentDate}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByDueDateAfterAndIsCompletedFalse(@PathVariable LocalDateTime currentDate) {
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByDueDateAfterAndIsCompletedFalse(currentDate);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 날짜 이후의 완료된 TodoList를 조회하는 엔드포인트
    @GetMapping("/completeddate/{completionDate}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByCompletionDateAfterAndIsCompletedTrue(@PathVariable LocalDate completionDate) {
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByCompletionDateAfterAndIsCompletedTrue(completionDate);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 특정 학생과 우선순위, 완료 여부에 따라 TodoList를 조회하는 엔드포인트
    @GetMapping("/member/{memberId}/priority/{priority}/completed/{isCompleted}")
    public ResponseEntity<ResponseDto<List<TodoList>>> getTodoListByMemberAndPriorityAndIsCompleted(
            @PathVariable Long memberId,
            @PathVariable Integer priority,
            @PathVariable Boolean isCompleted) {
        Member member = new Member();
        member.setMemberId(memberId);
        ResponseDto<List<TodoList>> responseDto = todoListService.getTodoListByMemberAndPriorityAndIsCompleted(member, priority, isCompleted);
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    // 우선순위에 따라 정렬된 TodoList를 가져오는 API 엔드포인트
    @GetMapping("/sortedByPriority")
    public ResponseDto<List<TodoList>> getAllTodoListsSortedByPriority() {
        return todoListService.getAllTodoListsSortedByPriority();
    }

}
