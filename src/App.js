import { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo.js";
import TaskList from "./Components/TaskList.js";
import { FaListCheck } from "react-icons/fa6";

export default function App() {

  const [todos, setTodos] = useState(JSON.parse(localStorage.UserToDo) || []);
  useEffect(() => {
    localStorage.UserToDo = JSON.stringify(todos);
  }, [todos]);

  // Function to update both state and localStorage
  const saveTodos = (updatedUserToDo) => {
    setTodos(updatedUserToDo);
  };

  // Handle adding a new todo
  const handleAddTodo = (title) => {
    const newTodo = {
      title,
      done: false,
    };
    saveTodos([...todos, newTodo]);
  };

  // Handle updating an existing todo
  const handleChangeTodo = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    saveTodos(updatedTodos);
  };

  // Handle deleting a todo
  const handleDeleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    saveTodos(updatedTodos);
  };

  return (
    <div className="main">
      <section>
        <h1><FaListCheck /> My Todos</h1>
        <AddTodo onAddTodo={handleAddTodo} />
        {todos.length > 0 ? (
          <TaskList
            todos={todos}
            onChangeTodo={handleChangeTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <h2>NO Todos</h2>
        )}
      </section>
    </div>
  );
}
