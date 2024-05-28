import Image from "next/image";
import Banner_Client from "@/Components/Banner_Client";
import Card from "@/Components/Card_server";
import { fetchDateSuggestion } from "@/lib/date-suggestion";

async function getData() {
  return await fetchDateSuggestion();
}

export default async function Home() {
  const datesID = await getData();
  console.log(datesID);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Banner_Client />

{/*       <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
              Pick a Date
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {datesID.map((date, idx) => (
            <Card 
              key={idx}
              name={date.name} 
              defaultImageURL="/static/mystery-card.png"
              imageURL={date.imageURL}
            />
          ))}
        </div>

      </div> */}

      <h3 className='font-interrrr'>Made with Love :)</h3>
    </main>
  );
}
