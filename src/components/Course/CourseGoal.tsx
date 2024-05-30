import {  useRef, type ReactNode } from "react";

// interface InputRef {
//   focus: () => void;
// }

interface CourseGoalProps {
  title: string;
  id: number;
  handleDelete: (goal: number) => void;
  children: ReactNode;
}
export default function CourseGoal({ title, id, handleDelete,children }: CourseGoalProps) {
  const handleDeleteFun = () => {
    handleDelete(id);
  }
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <article>
      <div>
        <input ref={inputRef}/>
        <h2>{ title }</h2>
          {children}
      </div>
      <button onClick={handleDeleteFun}>Delete</button>
  </article>
    )
}