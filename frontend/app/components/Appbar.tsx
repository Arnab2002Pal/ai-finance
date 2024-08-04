"use client"
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Appbar = () => {
  const { data: session, status } = useSession()  
  
  return (
    <header className="shadow-md mx-4 md:mx-12 mt-6 rounded-xl border-white border-2 border-solid bg-black">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-white">MyApp</a>
          </div>
          <div className="flex items-center">
            {status === 'loading' ? (
              <div className="text-white">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Hello, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Appbar
