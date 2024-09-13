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
            id="inpEdit"
            type="text"
            value={todo.title}
            onChange={(e) => onChange({ ...todo, title: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handelSaveClick(todo)}
          />
          <FaCheck size={20} onClick={() => handelSaveClick(todo)} />
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => onChange({ ...todo, done: e.target.checked })}
          />
          <label
            onDoubleClick={() => onChange({ ...todo, done: !todo.done })}
            style={{
              textDecoration: todo.done ? "line-through 2px red" : "",
            }}
          >
            {todo.title}
          </label>
          <FaPen size={20} onClick={() => setIsEditing(true)} />
          <FaTrash size={20} onClick={() => onDelete(todo.id)} />
        </>
      )}
    </>
  );
}
