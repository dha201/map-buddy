// Shortcut command: rfc -> Tab
'use client';
import React from 'react'

export default function Banner_Client() {

    const handleOnClick = () => {
        console.log('Find Dates');
    };

    return (
        <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
          <div className="z-20 flex flex-col px-2 md:pt-12">
            <h1 className="my-2 flex-wrap">
              <span className="pr-2 text-white">Date</span>
              <span className="text-gray-900">Buddy</span>
            </h1>
            <p className="font-sans text-xl font-semibold text-gray-900 md:mt-5 lg:text-2xl">
                Help you find the perfect Date!
            </p>
    
            <div className="mt-12">
              <button onClick={handleOnClick}>Find Dates</button>
            </div>
          </div>
        </div>
    );
}

