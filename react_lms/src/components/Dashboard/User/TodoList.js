import styled from "styled-components";
import {
  apiDeleteMyTodoList,
  apiGetMyTodoList,
  apiPostMyTodoList,
  apiPutMyTodoList,
} from "../../RestApi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext";
import { Icon } from "@iconify/react";

const Container = styled.div`
  & .titleTodo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  & .postTodo {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 1rem 0;
    padding: 5px 10px;
    & button {
      background-color: transparent;
      white-space: nowrap;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      background-color: #3182f6;
      color: #fff;
    }
    & input {
      padding: 2px;
      border: none;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  & ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 10px;
    & li {
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
      position: relative;
      & .xIcon {
        position: absolute;
        top: 0;
        right: 0;
        color: #3182f6;
      }
    }
  }
`;
export function TodoList() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // 유저의 todo 조회
  useEffect(() => {
    apiGetMyTodoList(user.memberId)
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((err) => {
        console.log("todo list 조회 실패: ", err);
      });
  }, [user.memberId]);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleTodoSubmit = () => {
    if (!newTodo) {
      alert("공백일 수 없습니다.");
      return;
    }
    const todoData = { member: user, taskName: newTodo };

    // 유저의 todo 저장
    apiPostMyTodoList(todoData)
      .then((response) => {
        setNewTodo("");
        return apiGetMyTodoList(user.memberId);
      })
      .then((response) => setTodos(response.data.data))
      .catch((err) => console.log("Todo 등록 실패: ", err));
  };

  const handleTodoUpdate = (e, taskId) => {
    const isCompleted = e.target.value === "done";
    const todoData = { member: user, isCompleted: isCompleted };

    // 유저의 todo completed 수정
    apiPutMyTodoList(taskId, todoData)
      .then((response) => {
        return apiGetMyTodoList(user.memberId);
      })
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((err) => console.log("todo list 수정 실패: ", err));
  };

  // 유저의 todo 삭제
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
        <div className="titleTodo">
          <Icon icon={"ri:todo-line"}></Icon>
          <h3>Daily Task</h3>
        </div>
        <div className="postTodo">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="새로운 할 일을 입력하세요."
          />
          <button onClick={handleTodoSubmit}>등록</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.taskId}>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={(e) => handleTodoUpdate(e, todo.taskId)}
              />
              <span
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  color: todo.isCompleted ? "#ddd" : "#212529",
                }}
              >
                {todo.taskName}
              </span>
              <Icon
                className="xIcon"
                onClick={() => handleTodoDelete(todo.taskId)}
                icon={"zondicons:close-outline"}
              ></Icon>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
