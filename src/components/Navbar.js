import React from "react";
import { useSelector } from "react-redux";
import { todosSelector } from "../store/reducers/todoSlice";

const Navbar = () => {
  const todos = useSelector(todosSelector);

  return (
    <div className="navbar">
      <h1>My redux App Todos</h1>
      <ul>
        <li>home</li>
        <li>about</li>
        <li>total Todos: {todos.length}</li>
      </ul>
    </div>
  );
};

export default Navbar;
