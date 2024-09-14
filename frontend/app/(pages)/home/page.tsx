"use client"
import React from 'react'
import Appbar from "../../components/Appbar";
import Doughnut from '@/app/components/ui/doughnut';
import { useSession } from 'next-auth/react';


const Home = () => {
  const { data: session, status } = useSession()  
  const email = session?.user?.email
  

  return (
    <div>
      <Appbar />
      <div className='mx-4 my-6 border-2 border-normal-500 border-solid rounded-xl h-screen'>
        <div className='flex justify-center items-center'>
        <Doughnut/>

        </div>
      </div>
    </div>
  )
}

export default Home
