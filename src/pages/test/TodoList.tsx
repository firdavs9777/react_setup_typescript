import React from "react";
import './TodoList.css';
interface ToDoListProps {
  items: { id: string, text: string }[];
  onDeleteTodo: (id: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = (props) => {
  return (
    <div>
      <ul>
        {props.items.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={props.onDeleteTodo.bind(null, todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ToDoList;