// import React, { useState } from 'react';
// import TodoList from './pages/TodoList';
// import NewToDo from './pages/NewToDo';
// import { ToDo } from './todo.model';

// const App: React.FC = () => {
//   // const todos = [{ id: 'id1', text: 'Finish the course' }];
//   const [todos, setTodos] = useState<ToDo[]>( [])
  
//   const todoHandler = (text: string) => {
//      // Managing state better  =>  using spread operator  and update the value
//      setTodos([...todos, { id: Math.random().toString(), text: text }])
//   }
//   const todoDeleteHandler = (todoId: string) => {
//     setTodos(prevTodos => {
//       return prevTodos.filter(todo => todo.id !== todoId)
//     })
//   }


//   // function component returns jsx
//   return (
//     <div>
//       <NewToDo onAddToDo={todoHandler} />
//       <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
//     </div>
  
//   )
// }
// // Working with props and types for props

// export default App;
import CourseGoal from './pages/CourseGoal';
import Header from "./pages/HeaderField";
import goalsImg from './assets/goal.jpg';
import { useState } from "react";

type CourseGoal = {
  title: string;
  description: string;
  id: number;
}
export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);
  
  function handleAddGoal() {
    setGoals(prevGoals => {
      const newGoal: CourseGoal = {
        id: Math.random(),
        title: 'Test React',
        description: 'Learn all the basics in depth!'
      };
      return [...prevGoals,newGoal]
     });
  }
  return (
    <main>
      <Header image={{ src: goalsImg, alt: 'A list of goals'}}>
        <h1> Your course Goals</h1>
      </Header>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
         <CourseGoal title={ goal.title}>
          <p>{goal.description}</p>
          </CourseGoal> 
          </li>
        ))}
</ul>

    </main>
  );
}