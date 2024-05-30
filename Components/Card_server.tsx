// app/components/Card.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type Activity = {
  activity: string;
  description: string;
};

type CostBreakdown = {
  item: string;
  description: string;
};

type Tip = {
  tip: string;
};

type CardType = {
  name: string;
  location: string;
  budget: string;
  activities?: Activity[];
  cost_breakdown?: CostBreakdown[];
  tips?: Tip[];
  defaultImageURL: string;
};

export default function Card({ name, location, budget, activities = [], cost_breakdown = [], tips = [], defaultImageURL }: CardType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('Card component received props:', { name, location, budget, activities, cost_breakdown, tips });
  }, [name, location, budget, activities, cost_breakdown, tips]);

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
          <div className="relative bg-white rounded-lg overflow-hidden shadow-lg max-w-4xl w-full p-4">
            <div className="relative h-64 w-full mb-4">
              <Image
                className="w-full h-full object-cover rounded-lg"
                src={defaultImageURL}
                layout="fill"
                objectFit="cover"
                alt={name}
              />
            </div>
            <div className="p-6 bg-black bg-opacity-75 rounded-lg text-white">
              <h2 className="text-3xl font-bold mb-4">{name}</h2>
              <p className="text-lg mb-2"><strong>Location:</strong> {location}</p>
              <p className="text-lg mb-2"><strong>Budget:</strong> {budget}</p>
              <div className="text-lg mb-4">
                <strong>Activities:</strong>
                {activities.length ? activities.map((activity, index) => (
                  <div key={index} className="mt-2">
                    <p className="font-semibold">{activity.activity}:</p>
                    <p>{activity.description}</p>
                  </div>
                )) : <p>No activities available</p>}
              </div>
              <div className="text-lg mb-4">
                <strong>Cost Breakdown:</strong>
                {cost_breakdown.length ? cost_breakdown.map((cost, index) => (
                  <div key={index} className="mt-2">
                    <p className="font-semibold">{cost.item}:</p>
                    <p>{cost.description}</p>
                  </div>
                )) : <p>No cost breakdown available</p>}
              </div>
              <div className="text-lg mb-4">
                <strong>Tips:</strong>
                {tips.length ? tips.map((tip, index) => (
                  <div key={index} className="mt-2">
                    <p>{tip.tip}</p>
                  </div>
                )) : <p>No tips available</p>}
              </div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
