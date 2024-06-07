// components/SignInButton.tsx
"use client";

import { useAuth } from '@/app/hooks/useAuth';
import { useState } from 'react';

const SignInButton = () => {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in with Google');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={handleSignIn} className="px-4 py-2 font-bold text-white bg-blue-500 rounded">
        Sign in with Google
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SignInButton;
