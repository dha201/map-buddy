'use client';

import Card from '@/Components/Card_server';
import { useEffect, useState } from 'react';

export default function Page() {
    const [dateIdea, setDateIdea] = useState(null);

    useEffect(() => {
        const storedDateIdea = localStorage.getItem('dateIdea');
        if (storedDateIdea) {
            const parsedDateIdea = JSON.parse(storedDateIdea);
            setDateIdea(parsedDateIdea);
            console.log('Stored date idea:', parsedDateIdea); // Log parsed date idea
        }
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-14">
            <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
                Your Date Idea
            </h2>
            {dateIdea ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
                    <Card
                        name={dateIdea.name}
                        location={dateIdea['date location']}
                        budget={dateIdea.budget}
                        activities={dateIdea.activities}
                        cost_breakdown={dateIdea.cost_breakdown}
                        tips={dateIdea.tips}
                        defaultImageURL="/static/mystery-card.png"
                        images={dateIdea.photos ? dateIdea.photos : []}
                    />
                </div>
            ) : (
                <p className="text-white">No date idea available.</p>
            )}
            <h3 className='font-interrrr'>Made with Love :)</h3>
        </main>
    );
}