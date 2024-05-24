/**
 * Root page of the app
 */


import Image from "next/image";
import Banner_Client from "@/Components/Banner_Client";
import Card from "@/Components/Card_server";

export default function Home() {
  const datesID = [
    {
     "name": "Coffee Date",
     "imageURL": "https://images.unsplash.com/photo-1548051072-b34898021f8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
 
    {
     "name": "Roof Top Date",
     "imageURL": "https://images.unsplash.com/photo-1513279922550-250c2129b13a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }, 
 
    {
     "name": "Wine Date",
     "imageURL": "https://images.unsplash.com/photo-1569929233287-f0565228c4d4?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
 
    {
     "name": "Horse Riding Date",
     "imageURL": "https://images.unsplash.com/photo-1559930477-620979bb1a39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
 
    {
     "name": "Explore Date",
     "imageURL": "https://images.unsplash.com/photo-1466979939565-131c4b39a51b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
 
    {
     "name": "Carnival Date",
     "imageURL": "https://images.unsplash.com/photo-1569813363237-bd17086c234c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
 
    {
     "name": "Boat Date",
     "imageURL": "https://images.unsplash.com/photo-1558452919-3a47422e2fd0?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    } 
  ];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Banner_Client />

      {datesID.map((date, idx) => (
        <Card 
          key={`${date}-{idx}`}
          name={date.name} 
          imageURL={date.imageURL}
          href={`/dates/${date.name}`}
        />
      ))};

      <h3 className='font-interrrr'>Made with Love :)</h3>
    </main>
  );
}
