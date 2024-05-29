
// import CourseGoal from './components/CourseGoal';
// import Header from "./pages/HeaderField";
// import goalsImg from './assets/goal.jpg';
// import Counter from './pages/Counter'
// import { useState } from "react";

// type CourseGoalType = {
//   title: string;
//   description: string;
//   id: number;
// }
// const defaultGoals: CourseGoalType[] = [
//   {
//     id: 1,
//     title: 'Test1',
//     description:'Test Description'
//   }
// ]

// export default function App() {
//   const [goals, setGoals] = useState<CourseGoalType[]>(defaultGoals);
//   const [newGoalTitle, setNewGoalTitle] = useState("");
//   const [newGoalDescription, setNewGoalDescription] = useState("");
//   function handleAddGoal() {
//     if (newGoalTitle !== '' && newGoalDescription !== '')
//     {
//       setGoals(prevGoals => {
//       const newGoal: CourseGoalType = {
//         id: Math.random(),
//         title: newGoalTitle,
//         description: newGoalDescription
//       };
//       return [newGoal, ...prevGoals ];
//     });
//     }
//     else
//     {
//       alert('Input title and description first')
//     }

//     setNewGoalTitle('');
//     setNewGoalDescription('');
//   }
//   function handleDeleteGoal(goalId: number) {
//         setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
//   }
//   return (
//     <main>
//       <Header image={{ src: goalsImg, alt: 'A list of goals'}}>
//         <h1> Your course Goals</h1>
//         <section>
//           <label>Title:</label>
//           <input type="text" id="description" value={newGoalTitle} onChange={(event) => setNewGoalTitle(event.target.value)} />
//           <label>Description:</label>
//           <input type="text" id="description" value={newGoalDescription} onChange={(event) => setNewGoalDescription(event.target.value)}/>
//         </section>
//         <button onClick={handleAddGoal}> Add Goal</button>
//       </Header>
//       <ul>
//         {goals.map((goal) => (
//           <li key={goal.id}>
//             <CourseGoal title={goal.title} handleDelete={handleDeleteGoal} id={goal.id} >
//           <p>{goal.description}</p>
//           </CourseGoal>
//           </li>
//         ))}
//       </ul>
//       <Counter/>
//     </main>
//   );
// }

import Footer from './components/Footer';
import Header from './components/Header'
import { Container } from 'react-bootstrap';
import ProductList from './components/Product/ProductList';
const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
           <ProductList/>
        </Container>
      </main>
      <Footer/>
    </>
  )
}
export default App;