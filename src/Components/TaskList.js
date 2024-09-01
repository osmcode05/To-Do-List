import { useState, useRef, useEffect } from "react";
import { FaTrash, FaCheck, FaPen } from "react-icons/fa";

export default function TaskList({ todos, onChangeTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Task todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Task({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const InpRef = useRef(null);

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      InpRef.current.focus();
    }
  }, [isEditing]);

  const handelSaveClick = (todo) => {
    setIsEditing(false);
    if (!/\S/.test(todo.title)) onDelete(todo.id);
  };

  return (
    <>
      {isEditing ? (
        <>
          <input
            ref={InpRef}
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
            onClick={() => handelSaveClick(todo)}
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
