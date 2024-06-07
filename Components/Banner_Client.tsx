'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface DateIdea {
  name: string;
  'date location': string;
  budget: string;
  activities: Array<{ activity: string; description: string; }>;
  cost_breakdown: Array<{ item: string; description: string; }>;
  tips: Array<{ tip: string; }>;
}

export default function Banner_Client() {
  const [mood, setMood] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [specialNote, setNote] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleOnClick = async () => {
    if (mood && budget && location) {
      setLoading(true); // Set loading to true when fetching starts

      try {
        console.log('Sending data:', { mood, budget, location });

        const generateIdeas = await fetch('/api/suggest-date-ideas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood, budget, location, specialNote }),
        });

        const data: DateIdea[] = await generateIdeas.json();
        console.log('Received data:', data);

        const dateIdeasWithPhotos = await Promise.all(data.map(async (dateIdea: DateIdea) => {
            let photos: string[] = [];
            const { 'date location': dateLocation, name } = dateIdea;
            console.log('Date location being used:', dateLocation);
            const locationName = dateLocation.split(',')[0].trim();

            if (locationName === 'At Home' || locationName === 'Your Backyard' || locationName === 'Your Home') {
              const findImage = await fetch('/api/serp-image-search', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: name }),
              });

              const imageData = await findImage.json();
              if (imageData.thumbnails && imageData.thumbnails.length > 0) {
                photos = imageData.thumbnails;
                console.log('Received image data:', photos);
              }
            } else {
              const findPlace = await fetch('/api/get-place-images', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ placeName: dateLocation }),
              });

              const placeData = await findPlace.json();
              console.log('Received place data:', placeData);
              if (placeData.photos && placeData.photos.length > 0) {
                photos = placeData.photos;
              }
            }

            return { ...dateIdea, photos };
          })
        );

        localStorage.setItem('dateIdeas', JSON.stringify(dateIdeasWithPhotos));
        console.log('Stored date ideas with photos:', dateIdeasWithPhotos);

        const url = `/dates/${encodeURIComponent(mood)}-${encodeURIComponent(location)}`;
        window.location.href = url;

      } catch (error) {
        console.error('Error fetching date ideas:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    } else {
      alert('Please select mood, budget, and location');
    }
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

        <div className="mt-6">
          <label className="block text-white mb-2">Enter your location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 rounded"
            placeholder="Enter your city or state"
          />
        </div>

        <div className="mt-6">
          <label className="block text-white mb-2">Select your mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded"
          >
            <option value="">--Choose a mood--</option>
            <option value="Adventurous">Adventurous</option>
            <option value="At-Home">At-Home</option>
            <option value="Creative">Creative</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="block text-white mb-2">Select your budget:</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 rounded"
          >
            <option value="">--Choose a budget--</option>
            <option value="$">$ (0 - $50)</option>
            <option value="$$">$$ ($50 - $200)</option>
            <option value="$$$">$$$ (above $200)</option>
          </select>
        </div>

        <div className="mt-6">
          <label className="block text-white mb-2">Enter any restriction or special note:</label>
          <input
            type="text"
            value={specialNote}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 rounded"
            placeholder="i.e No gluten, No seafood, physical restrictions, etc."
          />
        </div>

        <div className="mt-12">
          <button 
            onClick={handleOnClick} 
            className="bg-blue-500 text-white p-3 rounded flex items-center justify-center"
          >
            {loading ? (
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Find Dates"
            )}
          </button>
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
