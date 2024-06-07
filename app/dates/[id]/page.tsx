'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Card from '@/Components/Card_server';
import ProfileIcon from '@/Components/ProfileIcon';

// Define the type for the date idea object
interface DateIdea {
  name: string;
  'date location': string;
  budget: string;
  activities?: {
    activity: string;
    description: string;
  }[];
  cost_breakdown?: {
    item: string;
    description: string;
  }[];
  tips?: {
    tip: string;
  }[];
  photos?: string[];
}

export default function Page() {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const storedDateIdeas = localStorage.getItem('dateIdeas');
    if (storedDateIdeas) {
      const parsedDateIdeas = JSON.parse(storedDateIdeas) as DateIdea[];
      setDateIdeas(parsedDateIdeas);
      console.log('Stored date ideas:', parsedDateIdeas); // Log parsed date ideas
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session || !session.user) {
      // Redirect to login page
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return null; // Render nothing while redirecting
  }

  const userId = session.user?.id ?? session.user?.name ?? 'User';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <ProfileIcon userId={userId} />
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
