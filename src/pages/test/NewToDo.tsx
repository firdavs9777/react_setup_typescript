
import React, { useRef } from 'react';
import './NewToDo.css';

type NewToDoProps = {
  onAddToDo: (toDoText: string) => void;
}
// It shows that type is also included inside the function
const NewToDo: React.FC<NewToDoProps> = (props) => {
  const textInputref = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputref.current!.value;
    console.log(enteredText);
    props.onAddToDo(enteredText);
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div className='form-control'>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="to-do-text" ref={textInputref} />
      </div>
      <button type='submit'> Add Todo</button>
 </form>
  )
}

export default NewToDo;