'use client';

import React, { useState } from 'react';
import Image from 'next/image';

type CardType = {
  name: string;
  description: string;
  defaultImageURL: string;
};

export default function Card({ name, description, defaultImageURL }: CardType) {
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
        src={defaultImageURL}
        layout="fill"
        objectFit="cover"
        alt={name}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+ZNPQAIoQM4xp5zkgAAAABJRU5ErkJggg=="
        placeholder="blur"
      />
      {isExpanded && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="mt-2">{description}</p>
        </div>
      )}
    </div>
  );
}
