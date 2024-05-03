import React from "react";
import reactImg from '../assets/reciept_dinner.jpg'
import './TodoList.css';
import CoreConcepts from "./TestComponent";

interface ToDoListProps {
  items: { id: string, text: string }[];
  onDeleteTodo: (id: string) => void;
}

// function getRandomInt(max: any) {
//   return Math.floor
// }




const ToDoList: React.FC<ToDoListProps> = (props) => {

  return (
    <div>
      <img src={reactImg} alt="Stylized Atom" style={{ height: '200px' }} />
      <CoreConcepts title="Hello" description="test again"/>
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