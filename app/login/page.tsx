import { LoginCard } from "@/Components/auth/login-card";

export default async function loginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-14">
      <LoginCard />
    </main>
  );
}
