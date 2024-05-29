
'use client';
import React from 'react';
import { useRouter } from 'next/router';
import Card from '@/Components/Card_server';

export default function Page() {
    const router = useRouter();
    const { dateIdeas } = router.query;
    const parsedDateIdeas = JSON.parse(dateIdeas || '[]');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-14">
            <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
                Your Date Ideas
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
                {parsedDateIdeas.map((idea, idx) => (
                    <Card
                        key={idx}
                        name={idea.name}
                        description={idea.description}
                        defaultImageURL="/static/mystery-card.png"
                        imageURL="/static/mystery-card.png"
                    />
                ))}
            </div>
            <h3 className='font-interrrr'>Made with Love :)</h3>
        </main>
    );
}
