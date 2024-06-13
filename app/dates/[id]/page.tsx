'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Card from '@/Components/Card_server';
import ProfileIcon from '@/Components/ProfileIcon';
import HistoryMenu from '@/Components/user-ideas-history';

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
  website: string;
}

export default function ShowPage() {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const storedDateIdeas = localStorage.getItem('dateIdeas');
    if (storedDateIdeas) {
      const parsedDateIdeas = JSON.parse(storedDateIdeas) as DateIdea[];
      setDateIdeas(parsedDateIdeas);
      console.log('Stored date ideas:', parsedDateIdeas);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      console.log('Session status: loading');
      return;
    }

    if (!session || !session.user) {
      console.log('User not authenticated, redirecting to login');
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    console.log('Rendering loading state');
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return null;
  }

  const userId = session.user?.id ?? session.user?.name ?? 'User';

  console.log('Rendering main content');
  console.log('User ID:', userId);

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
              website={dateIdea.website}
            />
          ))}
        </div>
      ) : (
        <p className="text-white">No date ideas available.</p>
      )}
      <HistoryMenu userId={userId} />
    </main>
  );
}
