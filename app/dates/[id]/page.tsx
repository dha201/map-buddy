/**
 * DynamicRoutes
 */

import React from 'react'
import Link from 'next/link'

export default function page(props : { params : {id : string } }) {
  //Explanation: props is an object that contains the params object, which contains the id string

  //Destructure the params object
  const { params: { id } } = props;
  const arg = id;
  console.log('id', arg);
  
  return (
    <div className="h-full pb-80">
      Activity: {arg} !! 
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2
      lg:gap-4">
        <div className="mb-2 mt-24 text-lg font-bold">
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

