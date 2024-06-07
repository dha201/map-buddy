"use client";

import { signOut } from "next-auth/react";
import React, { useState } from "react";

interface ProfileIconProps {
  userId: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ userId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center justify-center p-2 w-36 rounded-full bg-purple-800 hover:bg-purple-600 focus:outline-none"
        >
          <span className="text-sm font-medium text-center">{userId}</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-7 mt-2 w-33 bg-white border border-white-200 rounded-md shadow-lg z-50">
            <button
              onClick={() => signOut()}
              className="block w-full p-2 text-center text-white-700 hover:bg-pruple-700 rounded-md"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileIcon;
