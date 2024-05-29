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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${isExpanded ? 'w-80 h-96' : 'w-64 h-80'}`}
        onClick={handleCardClick}
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
            <h2 className="text-2xl font-bold">{name}</h2>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full">
            <div className="relative h-64 w-full">
              <Image
                className="w-full h-full object-cover"
                src={defaultImageURL}
                layout="fill"
                objectFit="cover"
                alt={name}
              />
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{name}</h2>
              <p className="text-lg">{description}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
