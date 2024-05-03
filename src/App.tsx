import React, { useState } from 'react';
import TodoList from './pages/TodoList';
import NewToDo from './pages/NewToDo';
import { ToDo } from './todo.model';


const ReactDescriptions: string[] = ['Fundamentals', 'Curcial', 'Core'];

function getRandomInt(max: any) {
  return Math.floor(Math.random() * (max + 1));
}

const App: React.FC = () => {
  // const todos = [{ id: 'id1', text: 'Finish the course' }];
  const [todos, setTodos] = useState<ToDo[]>( [])
  
  const todoHandler = (text: string) => {
     // Managing state better  =>  using spread operator  and update the value
     setTodos([...todos, { id: Math.random().toString(), text: text }])
  }
  const todoDeleteHandler = (todoId: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }


  // function component returns jsx 
  return (
    <div>
      <p className='test'>
      {ReactDescriptions}
      </p>  
      {getRandomInt(9)}
      <NewToDo onAddToDo={todoHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  )
}
// Working with props and types for props

export default App;
