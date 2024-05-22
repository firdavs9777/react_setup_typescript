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
import CourseGoal from './components/CourseGoal';
import Header from "./pages/HeaderField";
import goalsImg from './assets/goal.jpg';
import { useState } from "react";

type CourseGoalType = {
  title: string;
  description: string;
  id: number;
}
const defaultGoals: CourseGoalType[] = [
  {
    id: 1,
    title: 'Test1',
    description:'Test Description'
  }
]

export default function App() {
  const [goals, setGoals] = useState<CourseGoalType[]>(defaultGoals);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");
  function handleAddGoal() {
    if (newGoalTitle !== '' && newGoalDescription !== '')
    {
      setGoals(prevGoals => {
      const newGoal: CourseGoalType = {
        id: Math.random(),
        title: newGoalTitle,
        description: newGoalDescription
      };
      return [newGoal, ...prevGoals ];
    });
    }
    else 
    {
      alert('Input title and description first')
    }

    setNewGoalTitle('');
    setNewGoalDescription('');
  }
  function handleDeleteGoal(goalId: number) {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));

  }
  return (
    <main>
      <Header image={{ src: goalsImg, alt: 'A list of goals'}}>
        <h1> Your course Goals</h1>
        <section>
          <label>Title:</label>
          <input type="text" id="description" value={newGoalTitle} onChange={(event) => setNewGoalTitle(event.target.value)} />
          <label>Description:</label>
          <input type="text" id="description" value={newGoalDescription} onChange={(event) => setNewGoalDescription(event.target.value)}/>
        </section>
        <button onClick={handleAddGoal}> Add Goal</button>
      </Header>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <CourseGoal title={goal.title} handleDelete={handleDeleteGoal} id={goal.id} >
          <p>{goal.description}</p>
          </CourseGoal> 
          </li>
        ))}
</ul>
    </main>
  );
}