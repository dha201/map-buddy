'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Banner_Client() {
    const [mood, setMood] = useState('');
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');

    const handleOnClick = async () => {
        if (mood && budget && location) {
            try {
                console.log('Sending data:', { mood, budget, location }); // Log data before sending
    
                // Fetch date ideas in a list of JSON Objects from the OPENAI API
                const response = await fetch('/api/suggest-date-ideas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ mood, budget, location }),
                });
    
                const data = await response.json();
                console.log('Received data:', data); // Log the received response
    
                const dateIdeasWithPhotos = await Promise.all(data.map(async (dateIdea) => {
                    const { 'date location': dateLocation } = dateIdea;
                    console.log('Date location being used:', dateLocation);
    
                    // Fetch the photoUrl from the Google Places API using the place name
                    const placeResponse = await fetch('/api/get-place-images', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ placeName: dateLocation }),
                    });
    
                    const placeData = await placeResponse.json();
                    console.log('Received place data:', placeData); // Log the received place data
    
                    if (placeData.photos && placeData.photos.length > 0) {
                        return { ...dateIdea, photos: placeData.photos };
                    } else {
                        return dateIdea;
                    }
                }));
    
                // Store the JSON array of date ideas with photos in local storage
                localStorage.setItem('dateIdeas', JSON.stringify(dateIdeasWithPhotos));
                console.log('Stored date ideas with photos:', dateIdeasWithPhotos); // Debugging: Log the object being stored
    
                // Navigate to the dates page with mood and location in the URL
                const url = `/dates/${encodeURIComponent(mood)}-${encodeURIComponent(location)}`;
                window.location.href = url;
    
            } catch (error) {
                console.error('Error fetching date ideas:', error);
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
                        <option value="adventurous">Adventurous</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="romantic">Romantic</option>
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

                <div className="mt-12">
                    <button onClick={handleOnClick} className="bg-blue-500 text-white p-3 rounded">
                        Find Dates
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
