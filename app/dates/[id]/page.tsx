'use client';

import Card from '@/Components/Card_server';
import { useEffect, useState } from 'react';

export default function Page() {
    const [dateIdeas, setDateIdeas] = useState([]);

    useEffect(() => {
        const storedDateIdeas = localStorage.getItem('dateIdeas');
        if (storedDateIdeas) {
            const parsedDateIdeas = JSON.parse(storedDateIdeas);
            setDateIdeas(parsedDateIdeas);
            console.log('Stored date ideas:', parsedDateIdeas); // Log parsed date ideas
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-14">
            <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
                Your Date Ideas
            </h2>
            {dateIdeas.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
                    {dateIdeas.map((dateIdea, index) => (
                        <Card
                            key={index}
                            name={dateIdea.name}
                            location={dateIdea['date location']}
                            budget={dateIdea.budget}
                            activities={dateIdea.activities}
                            cost_breakdown={dateIdea.cost_breakdown}
                            tips={dateIdea.tips}
                            defaultImageURL="/static/mystery-card.png"
                            images={dateIdea.photos ? dateIdea.photos : []}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-white">No date ideas available.</p>
            )}
            <h3 className='font-interrrr'>Made with Love :)</h3>
        </main>
    );
}
