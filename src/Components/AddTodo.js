import { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddTodo({ onAddTodo }) {
  const InpAdd = useRef(null);
  window.onload = () => {
    InpAdd.current.focus(); // Focus in The input if the page reloading
  };

  const [title, setTitle] = useState("");

  const AddTodo = () => {
    if (/[^ \t\r\n]/.test(title)) {
      onAddTodo(title);
      setTitle("");
    } else {
      alert("Please write a To Do");
    }
    InpAdd.current.focus();
  };

  return (
    <div className="AddDev">
      <input
        ref={InpAdd}
        placeholder="Add Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button id="AddBtn" onClick={AddTodo}>
        <FaPlus size={20} />
      </button>
    </div>
  );
}
