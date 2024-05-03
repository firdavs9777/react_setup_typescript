import React from "react";

interface CoreConceptProps {
  title: string,
  description: string
}
const CoreConcepts: React.FC<CoreConceptProps> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{ props.description}</p>
  </div>
   )
}

export default CoreConcepts;