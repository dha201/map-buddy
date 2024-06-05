'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import puppeteer from 'puppeteer';


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


const data: DateIdea[] = [
  {
    name: 'Karaoke Night In',
    'date location': 'At Home, Virginia',
    budget: '$',
    activities: [
      {
        activity: 'Set Up a Karaoke Station',
        description: 'Create a fun and lively atmosphere by setting up a karaoke station in your living room or backyard. Use a karaoke machine or apps on your phone or computer to access a wide range of songs.'
      },
      {
        activity: 'Sing Your Favorite Songs',
        description: 'Take turns singing your favorite songs and encourage each other to perform. Have a mix of solo performances and duets to make the night even more entertaining.'
      },
      {
        activity: 'Vote for the Best Performance',
        description: "After each performance, have a mini judging session where you vote for the best performance based on enthusiasm, creativity, and stage presence. Give out fun awards like 'Best Vocal Performance' or 'Most Entertaining'."
      }
    ],
    cost_breakdown: [
      {
        item: 'Snacks and Drinks',
        description: 'Prepare some popcorn, chips, or homemade snacks for the karaoke night. Have a variety of beverages like soda, juices, or mocktails.'
      },
      {
        item: 'Karaoke App Subscription',
        description: 'Consider subscribing to a karaoke app for a wider selection of songs. Many apps offer free trials or inexpensive monthly subscriptions.'
      },
      {
        item: 'Decorations and Lights',
        description: 'Add some extra fun to the ambiance with fairy lights, disco balls, or themed decorations to make the karaoke night more festive.'
      }
    ],
    tips: [
      {
        tip: 'Create a Song List: Prepare a list of songs to choose from in advance to avoid long pauses between performances.'
      },
      {
        tip: 'Dress Up: Encourage each other to dress up in fun costumes or attire that matches the theme of your chosen songs.'
      },
      {
        tip: "Record the Performances: Capture the fun moments by recording each other's performances to look back on and enjoy later."
      }
    ]
  },
  {
    name: 'Game Night Fun',
    'date location': 'At Home, Virginia',
    budget: '$',
    activities: [
      {
        activity: 'Choose Your Games',
        description: 'Select a variety of video games or board games that you both enjoy playing. Make sure to have a mix of competitive and cooperative games to keep things interesting.'
      },
      {
        activity: 'Snack Time',
        description: 'Prepare some budget-friendly snacks like popcorn, chips, or homemade cookies to enjoy during your game night. Snacking while gaming adds to the fun!'
      },
      {
        activity: 'Game On!',
        description: 'Set up your gaming area with comfy seating, good lighting, and your chosen games. Dive into the gaming world together, compete, strategize, and have a blast!'
      }
    ],
    cost_breakdown: [
      {
        item: 'Snacks and Drinks',
        description: 'Cost of snacks and drinks for the evening, including popcorn, chips, and beverages.'
      },
      {
        item: 'Game Rental or Purchase',
        description: 'If you need to rent or purchase new games, allocate a small budget for adding new games to your collection.'
      },
      {
        item: 'Optional: Game Add-Ons',
        description: 'Consider any optional in-game purchases or expansions if playing video games that offer additional content.'
      }
    ],
    tips: [
      {
        tip: 'Check out local thrift stores or online marketplaces for affordable board game options to expand your collection without breaking the bank.'
      },
      {
        tip: 'Create a cozy gaming atmosphere with dimmed lights, comfortable seating, and maybe some background music to enhance the gaming experience.'
      },
      {
        tip: 'Take turns choosing games to play to ensure both of you get to enjoy your favorite picks and discover new games together.'
      }
    ]
  },
  {
    name: 'Fit Together Workout Date',
    'date location': 'At Home, Virginia',
    budget: '$',
    activities: [
      {
        activity: 'Choose a Workout Video',
        description: 'Select a fun and challenging workout video together that suits both of your fitness levels and preferences.'
      },
      {
        activity: 'Set Up a Workout Area',
        description: 'Clear a space in your living room or backyard to create a workout zone where you both can move freely.'
      },
      {
        activity: 'Warm-Up and Exercise Together',
        description: 'Start with a joint warm-up session, followed by the workout video. Encourage and motivate each other throughout the workout.'
      }
    ],
    cost_breakdown: [
      {
        item: 'Workout Video Subscription',
        description: 'Consider subscribing to a workout platform or use free resources available online for a variety of workout videos.'
      },
      {
        item: 'Water and Towels',
        description: 'Keep hydrated during the workout and have towels handy for wiping off sweat.'
      },
      {
        item: 'Optional Fitness Equipment',
        description: 'If needed, you can invest in basic fitness equipment like yoga mats or resistance bands, but bodyweight exercises can be just as effective.'
      }
    ],
    tips: [
      {
        tip: 'Communicate and Support: Encourage each other and communicate openly about how the workout feels. Positive reinforcement can make the session more enjoyable.'
      },
      {
        tip: "Celebrate Achievements: Celebrate completing the workout together, regardless of the intensity. Acknowledge each other's effort and progress."
      },
      {
        tip: 'Cool Down Together: After the workout, cool down with some gentle stretching or yoga to relax your muscles and wind down the session.'
      }
    ]
  }
];


  const handleOnClick = async () => {
    if (mood && budget && location) {
      try {
        console.log('Sending data:', { mood, budget, location }); // Log data before sending

        // Fetch date ideas in a list of JSON Objects from the OPENAI API
        /* const generateIdeas = await fetch('/api/suggest-date-ideas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood, budget, location, specialNote }),
        });

        const data: DateIdea[] = await generateIdeas.json();
        console.log('Received data:', data);*/ 

        const dateIdeasWithPhotos = await Promise.all(data.map(async (dateIdea: DateIdea) => {
          const { 'date location': dateLocation, name } = dateIdea;
          console.log('Date location being used:', dateLocation);

          const locationName = dateLocation.split(',')[0].trim();
          let photos = [];

          if (locationName === 'At Home' || locationName === 'Your Backyard' || locationName === 'Your Home' ) {
            // Fetch image from DeepAI API
            /* const generateImage = await fetch('/api/generate-image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: dateIdea }), 
            });

            const imageData = await generateImage.json();
            console.log('Received image data:', imageData); // Log the received image data

            if (imageData.output_url) {
              photos.push(imageData.output_url);
            } */


            //Fetch image from Google custom search API
            /* const findImage = await fetch('/api/image-search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: name }),
            });

            const imageData = await findImage.json();
            console.log('Received image data:', imageData); // Log the received image data

            if(imageData.items && imageData.items.length > 0) {
              photos.push(imageData.items[0].link);
            } */

            // Fetch image from puppeteer
            const searchImage = await fetch('/api/image-search-serp', { 
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: name }),
            });

            const imageData = await searchImage.json();
            console.log('Received image data:', imageData); // Log the received image data

            if (imageData.images && imageData.images.length > 0) {
              photos = imageData.imageUrls;
            }
          } 
          
          else {
            // Fetch the photoUrl from the Google Places API using the place name
            const findPlace = await fetch('/api/get-place-images', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ placeName: dateLocation }),
            });

            const placeData = await findPlace.json();
            console.log('Received place data:', placeData); // Log the received place data

            if (placeData.photos && placeData.photos.length > 0) {
              photos = placeData.photos;
            }
          }

          return { ...dateIdea, photos };
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
            <option value="Adventurous">Adventurous</option>
            <option value="At-Home">At-Home</option>
            <option value="Creative">Creative</option>
            <option value="relaxed">Relaxed</option>
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
