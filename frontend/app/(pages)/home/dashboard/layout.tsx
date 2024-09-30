"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="w-full overflow-y-auto">
      {children}
    </div>
  );
}

