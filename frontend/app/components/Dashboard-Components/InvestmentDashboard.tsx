"use client"
import React from 'react'
import { IconArrowLeft } from "@tabler/icons-react";
import { useRecoilValue } from 'recoil';
import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import { useRouter } from 'next/navigation';
import PiChart from '../ui/pi-chart';


const InvestmentDashboard = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const router = useRouter();
  const { WhereToInvest } = userFinancialInfo.investmentAdvice
  
  

  const backClick = () => {
    router.push("/home");
  };
  return (
    <>
      <button
        onClick={backClick}
        className="flex w-full items-center justify-end pr-6 text-neutral-200 my-4 md:justify-start"
      >
        <IconArrowLeft className="text-neutral-200 h-5 w-5 flex-shrink-0" />{" "}
        Back
      </button>
      <div className="flex flex-1">
        <div className="p-12 md:p-10 rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none border border-neutral-700 bg-neutral-900 flex flex-col gap-10 items-start justify-center w-full h-full overflow-y-auto">
          <div className='text-4xl text-center md:text-left w-full'>
            <h1>Investment Overview</h1>
          </div>
          <div className="h-full w-full">
            <div className="flex flex-col md:flex-row gap-4 w-full h-full">
              {/* Chart Section */}
              <div className="w-full md:w-2/3 h-64 md:h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden">
                <PiChart WhereToInvest={WhereToInvest!}/>
              </div>

              {/* Investment Plan Section */}
              <div className="w-full md:w-1/3 p-6 rounded-lg bg-neutral-800 flex flex-col justify-start items-start overflow-hidden">
                <div className="text-xl md:text-3xl font-bold">
                  <h1>Summarized Investment Plan</h1>
                </div>
                <div className="mt-4 md:mt-6 max-h-40 md:max-h-64 overflow-auto scrollbar-hide">
                  {WhereToInvest?.Advice}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default InvestmentDashboard
