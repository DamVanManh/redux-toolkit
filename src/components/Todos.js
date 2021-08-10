import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  todosSelector,
  markComplete,
  deleteTodo,
  getTodos,
} from "../store/reducers/todoSlice";
import TodoForm from "./todoForm";

function Todos() {
  const dispatch = useDispatch();

  const todos = useSelector(todosSelector);
  const toggleTodoCompleted = (todoId) => {
    dispatch(markComplete(todoId));
  };
  const deleteSingleTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodoCompleted.bind(this, todo.id)}
            />
            <button onClick={deleteSingleTodo.bind(this, todo.id)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
