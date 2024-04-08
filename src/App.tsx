import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewToDo from './components/NewToDo';
import { ToDo } from './todo.model';

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
      <NewToDo onAddToDo={todoHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  )
}
// Working with props and types for props

export default App;
