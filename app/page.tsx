import Image from "next/image";
import Banner_Client from "@/Components/Banner_Client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <Banner_Client />
      <h3 className='font-interrrr'>Made with Love :)</h3>
    </main>
  );
}
