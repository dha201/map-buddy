import React from 'react'

export default function DynamicRoutes(props : { params : {id : string } }) {
  //Explanation: props is an object that contains the params object, which contains the id string

  //Destructure the params object
  const { params: { id } } = props;
  const arg = id;
  console.log('id', arg);
  
  return (
    <div>Activity: {arg} !! </div>
  )
}

