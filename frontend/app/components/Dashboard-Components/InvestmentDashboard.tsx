"use client"
import React from 'react'
import { useRecoilValue } from 'recoil';
import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import { useRouter } from 'next/navigation';
import DoughnutChart from '../ui/doughnut';


const InvestmentDashboard = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const router = useRouter();
  const { WhereToInvest } = userFinancialInfo.investmentAdvice

  return (
    <>
      <div className="flex gap-2 flex-1 w-full h-full">
        <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden">
          <DoughnutChart investment={WhereToInvest} />
        </div>
        <div className="w-full p-6 rounded-lg bg-neutral-800 flex flex-col justify-start items-start overflow-hidden">
          <div className="text-3xl font-bold">
            <h1>Why Investment Here?</h1>
          </div>
          <div className="mt-6 max-h-64 overflow-auto scrollbar-hide">
            <div className='flex flex-col mb-10'>
              <h3 className='text-xl font-semibold'>
                Why is investing in different asset classes important for managing risk?
              </h3>
              <div className='ml-5 mt-3'>
                <span className='pr-2'>&#8594;</span>
                {
                  WhereToInvest?.DiversificationStrategy
                }
              </div>
            </div>
            <div className='flex flex-col mb-10'>
              <h3 className='text-xl font-semibold'>
                How does diversification support your short-term and long-term goals?
              </h3>
              <div className='ml-5 mt-3'>
                <span className='pr-2'>&#8594;</span>
                {
                  WhereToInvest?.GoalAlignment
                }
              </div>
            </div>
            <div className='flex flex-col mb-10'>
              <h3 className='text-xl font-semibold'>
                Why is this mix of investments chosen based on your risk tolerance?
              </h3>
              <div className='ml-5 mt-3'>
                <span className='pr-2'>&#8594;</span>
                {
                  WhereToInvest?.StrategyRationale
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvestmentDashboard
