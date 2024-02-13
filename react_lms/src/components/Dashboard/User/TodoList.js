import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../AuthContext";
import {
  apiDeleteMyTodoList,
  apiGetMyTodoList,
  apiPostMyTodoList,
  apiPutMyTodoList,
} from "../../RestApi";
import styled from "styled-components";

const Container = styled.div``;

export function TodoList() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [newTodoContent, setNewTodoContent] = useState("");
  const memberId = user.memberId;

  useEffect(() => {
    apiGetMyTodoList(memberId)
      .then((response) => {
        setTodos(response.data.data);
      })
      .catch((error) => {
        console.error("TodoList 조회 실패: ", error);
      });
  }, [memberId]);

  const saveTodo = () => {
    const todoData = {
      memberId: memberId,
      content: newTodoContent,
    };

    apiPostMyTodoList(todoData)
      .then((response) => {
        apiGetMyTodoList(memberId)
          .then((response) => {
            setTodos(response.data.data);
          })
          .catch((error) => {
            console.error("TodoList 조회 실패: ", error);
          });
        setNewTodoContent(""); // input field 초기화
      })
      .catch((error) => {
        console.error("TodoList 저장 실패: ", error);
      });
  };

  const updateTodo = (taskId, updatedContent) => {
    const updatedTodoData = {
      taskId: taskId,
      content: updatedContent,
    };

    apiPutMyTodoList(updatedTodoData)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo.taskId === taskId ? response.data.data : todo
          )
        );
      })
      .catch((error) => {
        console.error("TodoList 수정 실패: ", error);
      });
  };

  const deleteTodo = (taskId) => {
    apiDeleteMyTodoList(taskId)
      .then(() => {
        setTodos(todos.filter((todo) => todo.taskId !== taskId));
      })
      .catch((error) => {
        console.error("TodoList 삭제 실패: ", error);
      });
  };

  return (
    <Container>
      <input
        type="text"
        value={newTodoContent}
        onChange={(e) => setNewTodoContent(e.target.value)}
      />
      <button onClick={saveTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) =>
          todo ? (
            <li key={todo.taskId}>
              <input
                type="text"
                value={todo.content}
                onChange={(e) => updateTodo(todo.taskId, e.target.value)}
              />
              <button onClick={() => deleteTodo(todo.taskId)}>Delete</button>
            </li>
          ) : null
        )}
      </ul>
    </Container>
  );
}
