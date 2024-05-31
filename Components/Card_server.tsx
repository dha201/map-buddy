// app/components/Card.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  images?: string[];
};

export default function Card({
  name,
  location,
  budget,
  activities = [],
  cost_breakdown = [],
  tips = [],
  defaultImageURL,
  images = []
}: CardType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState(defaultImageURL);
  const [fontSize, setFontSize] = useState('text-2xl');
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.log('Card component received props:', { name, location, budget, activities, cost_breakdown, tips, defaultImageURL, images });
    console.log('Initial imageURL:', images);
  }, [name, location, budget, activities, cost_breakdown, tips, defaultImageURL, images]);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true
  };

  useEffect(() => {
    if (titleRef.current) {
      const titleLength = titleRef.current.innerText.length;
      if (titleLength > 20) {
        setFontSize('text-xl');
      } else if (titleLength > 10) {
        setFontSize('text-2xl');
      } else {
        setFontSize('text-3xl');
      }
    }
  }, [isExpanded, name]);

  return (
    <>
      <div
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${isExpanded ? 'w-80 h-96' : 'w-64 h-80'}`}
        onClick={handleCardClick}
        onMouseEnter={() => {
          setImageURL(images[0] || defaultImageURL);
          setIsExpanded(true);
        }}
        onMouseLeave={() => {
          setImageURL(defaultImageURL);
          setIsExpanded(false);
        }}
      >
        <Image
          className="rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          src={imageURL}
          layout="fill"
          objectFit="cover"
          alt={name}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8/+ZNPQAIoQM4xp5zkgAAAABJRU5ErkJggg=="
          placeholder="blur"
        />

        {isExpanded && (
          <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-4">
            <h2 ref={titleRef} className={`font-bold transition-all duration-300 ease-in-out ${fontSize}`}>{name}</h2>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white bg-opacity-75 rounded-lg overflow-hidden shadow-lg w-full h-full max-w-[calc(100%-100px)] max-h-[calc(100%-80px)] p-4 flex flex-col">
            
            <button
              className="absolute bottom-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-md z-10"
              onClick={closeModal}
            >
              Close
            </button>

            <div className="flex flex-row h-full">

              <div className="w-1/3 p-4 flex items-center justify-center h-full">
                <div className="w-full max-w-md"> {/* Added a new container with controlled width */}
                  <Slider {...sliderSettings}>
                    {images.length > 0 ? images.map((image, index) => (
                      <div key={index} className="h-[30rem]">
                      {/*<div key={index} className="h-[30rem]"> */}
                        <div className="relative h-full">
                          <Image
                            className="object-cover rounded-lg"
                            src={image}
                            layout="fill"
                            objectFit="cover"
                            alt={`${name} image ${index + 1}`}
                          />
                        </div>
                      </div>
                    )) : (
                      <div className="h-40">
                        <div className="relative h-full">
                          <Image
                            className="object-cover rounded-lg"
                            src={defaultImageURL}
                            layout="fill"
                            objectFit="cover"
                            alt={`${name} image 1`}
                          />
                        </div>
                      </div>
                    )}
                  </Slider>
                </div>
              </div>

              <div className="w-2/3 p-6 text-black overflow-y-auto">
                <h2 className="text-3xl font-bold mb-4">{name}</h2>
                <p className="text-lg mb-2"><strong>Location:</strong> <span className="font-normal">{location}</span></p>
                <p className="text-lg mb-2"><strong>Budget:</strong> <span className="font-normal">{budget}</span></p>
                
                <div className="text-lg mb-5">
                  <strong>Activities:</strong>
                  {activities.length ? activities.map((activity, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-lg font-semibold">{activity.activity}:</p>
                      <p className="text-lg font-normal">{activity.description}</p>
                    </div>
                  )) : <p>No activities available</p>}
                </div>

                <div className="text-lg mb-5">
                  <strong>Cost Breakdown:</strong>
                  {cost_breakdown.length ? cost_breakdown.map((cost, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-lg font-semibold">{cost.item}:</p>
                      <p className="text-lg font-normal">{cost.description}</p>
                    </div>
                  )) : <p>No cost breakdown available</p>}
                </div>

                <div className="text-lg mb-2">
                  <strong>Tips:</strong>
                  {tips.length ? tips.map((tip, index) => (
                    <div key={index} className="mt-2">
                      <p className="text-lg font-normal">{tip.tip}</p>
                    </div>
                  )) : <p>No tips available</p>}
                </div>

            </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
