import { useState } from "react";
import { FaTrash, FaCheck, FaPen } from "react-icons/fa";

export default function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <>
          <input
            type="text"
            value={todo.title}
            onChange={(e) => onChange({ ...todo, title: e.target.value })}
            style={{
              flexGrow: 1,
              textAlign: "start",
              fontSize: "1rem",
              outline: "none",
              padding: ".2rem",
            }}
          />
          <FaCheck
            role="button"
            size={16}
            onClick={() => {
              setIsEditing(false);
              if (!/\S/.test(todo.title)) onDelete(todo.id);
            }}
          />
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => onChange({ ...todo, done: e.target.checked })}
          />
          <p
            onDoubleClick={() => onChange({ ...todo, done: !todo.done })}
            style={{
              flexGrow: 1,
              textAlign: "start",
              fontSize: "1rem",
              textDecoration: todo.done ? "line-through 2px red" : "",
            }}
          >
            {todo.title}
          </p>
          <FaPen size={16} role="button" onClick={() => setIsEditing(true)} />
          <FaTrash size={16} role="button" onClick={() => onDelete(todo.id)} />
        </>
      )}
    </>
  );
}
