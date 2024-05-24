'use client';
import React from 'react';
import Image from 'next/image';

export default function Banner_Client() {

    const handleOnClick = () => {
        console.log('Find Dates');
    };

    return (
        <div className="relative mb-12 lg:mb-24 lg:grid lg:grid-cols-2 lg:gap-12">
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
          <div className="relative z-10 lg:absolute lg:right-0 lg:top-10 lg:w-[50%]">
              <Image
                src="/static/hero-image.png"
                width={800}
                height={300}
                alt="hero image"
                priority={true}
                className="relative"
              />
            </div>
        </div>
    );
}
