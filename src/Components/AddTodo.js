import { useState, useRef } from "react";
import { FaPlus } from "react-icons/fa";

export default function AddTodo({ onAddTodo }) {
  const InpAdd = useRef(null);
  const [todoTxt, setTodoTxt] = useState("");

  const AddTodo = () => {
    if (/[^ \t\r\n]/.test(todoTxt)) {
      onAddTodo(todoTxt);
      setTodoTxt("");
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
        value={todoTxt}
        onChange={(e) => setTodoTxt(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && AddTodo()}
      />
      <button id="AddBtn" onClick={AddTodo}>
        <FaPlus size={25} />
      </button>
    </div>
  );
}
