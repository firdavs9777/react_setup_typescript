import React, { useState } from 'react';
import TodoList from './pages/TodoList';
import NewToDo from './pages/NewToDo';
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
// import CourseGoal from "./pages/CourseGoal"
// export default function App() {
//   return (
//     <main>
//       <CourseGoal title="Learn React" >
//         <p>Learn it from the ground up.</p>
//       </CourseGoal>
//     </main>
//   );
// }