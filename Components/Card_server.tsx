'use client';

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

type CardType = {
  name: string;
  defaultImageURL: string;
  imageURL: string;
};

export default function Card({ name, defaultImageURL, imageURL }: CardType) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${isExpanded ? 'w-full h-96' : 'w-64 h-80'}`}
      onClick={handleOnClick}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Image
        className="rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        src={isExpanded ? imageURL : defaultImageURL}
        layout="fill"
        objectFit="cover"
        alt={name}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+ZNPQAIoQM4xp5zkgAAAABJRU5ErkJggg=="
        placeholder="blur"
      />
      {isExpanded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
      )}
    </div>
  );
}



/* import React from 'react'
import Link from "next/link";
import Image from "next/image";

type CardType = {
    name: string;
    imageURL: string;
    href: string;  
} */

/* export default function Card({name, imageURL, href}: CardType) {
  return (
    // routing to the href
    <Link href= {imageURL}> 
        <h2>{name}</h2>
        <Image src={imageURL} alt={name} width={260} height={260} />
    </Link>
  )
} */

/* export default function Card({ name, imageURL, href }: CardType) {
    return (
      <Link href={imageURL} className="m-auto rounded-xl border-gray-400 shadow-2xl">
        <div
          className={`glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl`}
        >
          <div className="my-3">
            <h2 className="w-64 text-ellipsis whitespace-nowrap text-xl font-bold">
              {name}
            </h2>
          </div>
          <div className="relative w-full h-48">
            <Image
              className="rounded-lg shadow-lg"
              src={imageURL}
              layout="fill"
              objectFit="cover"
              alt={'Couple Image'}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+ZNPQAIoQM4xp5zkgAAAABJRU5ErkJggg=="
              placeholder="blur"
            />
          </div>
        </div>
      </Link>
    );
  } */