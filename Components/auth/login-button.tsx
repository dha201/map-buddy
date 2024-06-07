// app/components/LoginButton.tsx
'use client';
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface LoginButtonProps {
  provider: "google" | "github";
}

export const LoginButton: FC<LoginButtonProps> = ({ provider }) => {
  const handleLogin = () => {
    signIn(provider);
  };

  const getProviderDetails = () => {
    switch (provider) {
      case "google":
        return { label: "Google", icon: <FcGoogle /> };
      case "github":
        return { label: "GitHub", icon: <FaGithub /> };
      default:
        return { label: "", icon: null };
    }
  };

  const { label, icon } = getProviderDetails();

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      {icon}
      <span className="ml-2">Sign in with {label}</span>
    </button>
  );
};
