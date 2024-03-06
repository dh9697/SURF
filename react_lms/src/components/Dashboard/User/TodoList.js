import styled from "styled-components";
import {
  apiDeleteMyTodoList,
  apiGetMyTodoList,
  apiPostMyTodoList,
  apiPutMyTodoList,
} from "../../RestApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext";

const Container = styled.div``;
export function TodoList() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateTaskName, setUpdateTaskName] = useState("");

  useEffect(() => {
    apiGetMyTodoList(user.memberId)
      .then((response) => {
        setTodos(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log("todo list 조회 실패: ", err);
      });
  }, [user.memberId]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleTodoSubmit = () => {
    const todoData = { member: user, taskName: newTodo };

    apiPostMyTodoList(todoData)
      .then((response) => {
        setNewTodo("");
        return apiGetMyTodoList(user.memberId);
      })
      .then((response) => setTodos(response.data.data))
      .catch((err) => console.log("Todo 등록 실패: ", err));
  };

  const handleTodoUpdate = (taskId, updateTaskName) => {
    const todoData = { member: user, taskName: updateTaskName };
    apiPutMyTodoList(taskId, todoData)
      .then((response) => {
        return apiGetMyTodoList(user.memberId);
      })
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((err) => console.log("todo list 수정 실패: ", err));
  };

  const handleTodoDelete = (taskId) => {
    apiDeleteMyTodoList(taskId)
      .then((response) => {
        return apiGetMyTodoList(user.memberId);
      })
      .then((response) => setTodos(response.data.data))
      .catch((err) => console.log("Todo 삭제 실패: ", err));
  };

  return (
    <>
      <Container>
        <p>Daily Task</p>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="새로운 할 일을 입력하세요."
        />
        <button onClick={handleTodoSubmit}>등록</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.taskId}>
              {todo.taskName}
              <input
                type="text"
                value={updateTaskName}
                onChange={(e) => setUpdateTaskName(e.target.value)}
                placeholder="수정할 내용을 입력하세요."
              />
              <button
                onClick={() => handleTodoUpdate(todo.taskId, updateTaskName)}
              >
                수정
              </button>
              <button onClick={() => handleTodoDelete(todo.taskId)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
