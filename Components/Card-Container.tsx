'use client';

import React, { useState, useEffect } from 'react';
import Card from './Card_server';

const CardContainer = ({ apiUrl }) => {
  const [dateIdea, setDateIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mood: 'Adventurous', budget: '$', location: 'Virginia' }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log fetched data
        setDateIdea(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Date Idea:', dateIdea); // Log date idea before rendering Card component

  return (
    dateIdea && (
      <Card
        name={dateIdea.name}
        location={dateIdea.location}
        budget={dateIdea.budget}
        activities={dateIdea.activities}
        cost_breakdown={dateIdea.cost_breakdown}
        tips={dateIdea.tips}
        defaultImageURL="path/to/default/image.jpg"
      />
    )
  );
};

export default CardContainer;
