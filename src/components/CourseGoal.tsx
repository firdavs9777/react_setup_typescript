import {  type ReactNode } from "react";
import React from "react";

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

  return (
    <article>
      <div>
        <h2>{ title }</h2>
          {children}
      </div>
      <button onClick={handleDeleteFun}>Delete</button>
  </article>
    )
}