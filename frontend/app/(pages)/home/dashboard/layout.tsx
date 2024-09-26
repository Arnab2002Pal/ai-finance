"use client";
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const backClick = () => { 
    router.push("/home");
  }

  return (
    <div className="ml-4">
      <button
        onClick={backClick}
        className="inline-flex items-center text-neutral-200 mt-4 \"
      >
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />{" "} Back
      </button>

      {children}
    </div>
  );
}

