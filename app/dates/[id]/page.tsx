import Card from '@/Components/Card_server';

export default function Page({ searchParams }) {
    const { dateIdea } = searchParams;
    const parsedDateIdea = dateIdea ? JSON.parse(decodeURIComponent(dateIdea)) : null;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-14">
            <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
                Your Date Idea
            </h2>
            {parsedDateIdea ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
                    <Card
                        name={parsedDateIdea.name}
                        location={parsedDateIdea.location}
                        budget={parsedDateIdea.budget}
                        activities={parsedDateIdea.activities}
                        cost_breakdown={parsedDateIdea.cost_breakdown}
                        tips={parsedDateIdea.tips}
                        defaultImageURL="/static/mystery-card.png"
                    />
                </div>
            ) : (
                <p className="text-white">No date idea available.</p>
            )}
            <h3 className='font-interrrr'>Made with Love :)</h3>
        </main>
    );
}
