"use client";
import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Appbar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-4 md:px-12 mt-6 rounded-xl">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">Fortuna AI</a>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className="text-white text-center md:text-left">Hello, {session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}` })}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Appbar;