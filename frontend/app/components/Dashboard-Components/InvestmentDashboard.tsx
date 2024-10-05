"use client"
import React from 'react'
import { IconArrowLeft } from "@tabler/icons-react";
import { useRecoilValue } from 'recoil';
import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import { useRouter } from 'next/navigation';
import PiChart from '../ui/pi-chart';
import DoughnutChart from '../ui/doughnut';
import { InvestmentAdvice } from '@/app/interface/userInterface';


const InvestmentDashboard = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const router = useRouter();
  const { WhereToInvest } = userFinancialInfo.investmentAdvice
  
  

  const backClick = () => {
    router.push("/home");
  };
  return (
    <>
      <div className="flex gap-2 flex-1 w-full h-full">
        <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden">
          <DoughnutChart investment={WhereToInvest}/>
        </div>
        <div className="w-full p-6 rounded-lg bg-neutral-800 flex flex-col justify-start items-start overflow-hidden">
          <div className="text-3xl font-bold">
            <h1>Structured Investment Plan</h1>
          </div>
          <div className="mt-6 max-h-64 overflow-auto scrollbar-hide">
            {/* {category?.structuredPlan &&
              // This method returns an array of key-value pairs from the category object. You can then loop over it using forEach.
              Object.entries(category.structuredPlan).map(
                ([key, value]) => (
                  <div key={key} className="mb-6">
                    <p className="text-xl font-bold">{key}</p>
                    <p className="text-neutral-400">
                      {value as React.ReactNode}
                    </p>
                  </div>
                )
              )} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default InvestmentDashboard
