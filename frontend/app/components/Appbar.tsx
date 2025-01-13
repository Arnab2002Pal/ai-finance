"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Appbar = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 w-full h-14 md:h-16 z-30 bg-zinc-700 bg-opacity-10 backdrop-blur-md">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-white">
            Kuber AI
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-black">Hello, {session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` })}
                className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Appbar;
