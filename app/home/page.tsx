"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Banner_Client from "@/Components/Banner_Client";
import ProfileIcon from "@/Components/ProfileIcon";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    router.push("/login");
    return null;
  }

  const userId = session.user?.id ?? session.user?.name ?? 'User';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <ProfileIcon userId={userId} />
      <Banner_Client />
      <h3 className='font-interrrr'>Made with Love :)</h3>
    </main>
  );
}
