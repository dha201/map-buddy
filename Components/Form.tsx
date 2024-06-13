'use client';

import React, { useState } from 'react';

interface DateIdea {
  name: string;
  'date location': string;
  budget: string;
  activities: Array<{ activity: string; description: string; }>;
  cost_breakdown: Array<{ item: string; description: string; }>;
  tips: Array<{ tip: string; }>;
}

interface FormProps {
  userId: string;
}

export default function Form({ userId }: FormProps) {
  const [mood, setMood] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [specialNote, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnClick = async () => {
    if (mood && budget && location) {
      setLoading(true);

      try {
        console.log('Generting date ideas.....');
        const response = await fetch('/api/suggest-date-ideas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood, budget, location, specialNote, userId }),
        });

        const data: DateIdea[] = await response.json();

        console.log('Getting Images for the date ideas.....');
        const dateIdeasWithPhotos = await Promise.all(
          data.map(async (dateIdea: DateIdea) => {
            let photos: string[] = [];
            let website: string = 'No website available';
        
            const { 'date location': dateLocation, name } = dateIdea;
            const locationName = dateLocation.split(',')[0].trim();
        
            if (locationName === 'At Home' || locationName === 'Your Backyard' || locationName === 'Your Home') {
              const findImage = await fetch('/api/serp-image-search', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: `${name} For Couple` }),
              });
        
              const imageData = await findImage.json();
              if (imageData.thumbnails && imageData.thumbnails.length > 0) {
                photos = imageData.thumbnails;
              }
        
              website = 'No website available';
            } else {
              const findPlace = await fetch('/api/get-place-images', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ placeName: dateLocation }),
              });
        
              const placeData = await findPlace.json();
              if (placeData.photos && placeData.photos.length > 0) {
                photos = placeData.photos;
              }
              if (placeData.website) {
                website = placeData.website;
              }
        
              const findImage = await fetch('/api/image-search', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: `${name} For Couple` }),
              });
        
              const imageData = await findImage.json();
              if (imageData.thumbnails && imageData.thumbnails.length > 0) {
                photos = [...photos, ...imageData.thumbnails];
              }
            }
        
            return { ...dateIdea, photos, website };
          })
        );
        
        // Make a POST request to save the generated date ideas with photos and website
        console.log('Posting date ideas to the database.....');
        const storeIdeas = await fetch('/api/dateIdeasDB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, dateIdeas: dateIdeasWithPhotos }),
        });

        localStorage.setItem('dateIdeas', JSON.stringify(dateIdeasWithPhotos));
        const url = `/dates/${encodeURIComponent(mood)}-${encodeURIComponent(location)}`;
        window.location.href = url;

      } catch (error) {
        console.error('Error fetching date ideas:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please select mood, budget, and location');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center overflow-auto max-h-full p-4">
        <h1 className="my-2 text-center text-lg">
          <span className="pr-1 text-white text-2xl">Date</span>
          <span className="text-2xl text-white">Buddy</span>
        </h1>

        <p className="font-sans text-sm font-semibold text-white lg:text-lg text-center">
          Help you find the perfect Date!
        </p>

        <div className="mt-6 w-full">
          <label className="block text-white mb-2">Enter your location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 rounded text-black"
            placeholder="Enter your city or state"
          />
        </div>

        <div className="mt-6 w-full">
          <label className="block text-white mb-2">Select your mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="">--Choose a mood--</option>
            <option value="Adventurous">Adventurous</option>
            <option value="At-Home">At-Home</option>
            <option value="Creative">Creative</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>

        <div className="mt-6 w-full">
          <label className="block text-white mb-2">Select your budget:</label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="">--Choose a budget--</option>
            <option value="$">$ (0 - $50)</option>
            <option value="$$">$$ ($50 - $200)</option>
            <option value="$$$">$$$ (above $200)</option>
          </select>
        </div>

        <div className="mt-6 w-full">
          <label className="block text-white mb-2">Enter any restriction or special note:</label>
          <input
            type="text"
            value={specialNote}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 rounded text-black"
            placeholder="i.e No gluten, No seafood, physical restrictions, etc."
          />
        </div>

        <div className="mt-12 w-full flex justify-center">
          <button
            onClick={handleOnClick}
            className="mt-2 px-8 py-4 bg-purple-951 text-black rounded-full shadow-lg hover:bg-blue-900 font-bold"
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
    </div>
  );
}
