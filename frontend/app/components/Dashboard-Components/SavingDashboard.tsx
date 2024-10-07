import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const SavingDashboard = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const { savingPlan } = userFinancialInfo;

  return (
    <>
      <div className="flex flex-col w-full h-full">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Monthly Saving Card */}
          <div className="flex flex-col justify-center items-start p-6 h-32 w-full rounded-lg bg-gradient-to-t from-green-700 to-neutral-900">
            <div className="text-xl font-medium text-gray-300">Total Monthly Saving:</div>
            <div className="w-full h-14 flex flex-row justify-start items-center text-4xl font-bold text-white">
              ₹{savingPlan.TotalMonthlySaving}
            </div>
          </div>

          {/* Annual Saving Card */}
          <div className="flex flex-col justify-center items-start p-6 h-32 w-full rounded-lg bg-gradient-to-t from-blue-700 to-neutral-900">
            <div className="text-xl font-medium text-gray-300">Annual Saving:</div>
            <div className="w-full h-14 flex flex-row justify-start items-center text-4xl font-bold text-white">
              ₹{savingPlan.AnnualSaving}
            </div>
          </div>

          {/* Percentage of Salary Saved Card */}
          <div className="flex flex-col justify-center items-start p-6 h-32 w-full rounded-lg bg-gradient-to-t from-yellow-600 to-neutral-900">
            <div className="text-xl font-medium text-gray-300">Percentage of Salary Saved:</div>
            <div className="w-full h-14 flex flex-row justify-start items-center text-4xl font-bold text-white">
              {savingPlan.PercentageOfSalarySaved}
            </div>
          </div>
        </div>

        {/* Advice Section */}
        <div className="w-full p-6 rounded-lg bg-neutral-800 text-white mt-6">
          <h3 className="text-2xl font-bold">Advice</h3>
          <p className="mt-4 text-lg text-neutral-300">
            {savingPlan.Advice}
          </p>
        </div>
      </div>
    </>
  );
};

export default SavingDashboard;
