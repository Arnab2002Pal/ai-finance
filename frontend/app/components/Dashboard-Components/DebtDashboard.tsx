import { userFinancialInfoState } from '@/app/store/atoms/financialAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';

const DebtDashboard = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const { debtManagement } = userFinancialInfo;

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-lg w-full flex flex-col gap-8">
      {/* Debt Strategy Section */}
      <div className="bg-neutral-800 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-green-400 mb-3">Debt Strategy</h2>
        <p className="text-neutral-400">
          {debtManagement?.Advice.DebtStrategy || "Your debt strategy will appear here when data is available."}
        </p>
      </div>

      {/* Priority Section */}
      <div className="bg-neutral-800 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-400 mb-3">Debt Priority</h2>
        <p className="text-neutral-400">
          {debtManagement?.Advice.Priority || "Priority details will be shown here."}
        </p>
      </div>

      {/* Financial Overview Section */}
      <div className="bg-neutral-800 p-5 rounded-lg shadow-md flex justify-between items-center gap-6">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-blue-400">Total Debt</h3>
          <p className="text-3xl font-semibold">
            {debtManagement?.TotalDebt ? `₹ ${debtManagement.TotalDebt}` : "N/A"}
          </p>
        </div>

        {/* Time Period */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-purple-400">Time Period</h3>
          <p className="text-lg font-medium text-neutral-300">
            {debtManagement?.MoneyToSetAside?.TimePeriod || "N/A"}
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-yellow-400">Suggested Amount to Set Aside</h3>
          <p className="text-3xl font-semibold">
            {debtManagement?.MoneyToSetAside.SuggestedAmount ? `₹ ${debtManagement.MoneyToSetAside.SuggestedAmount}` : "N/A"}
          </p>
        </div>
      </div>

      {/* Funds Consideration Section */}
      <div className="bg-neutral-800 p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-yellow-400 mb-3">Available Funds Consideration</h2>
        <p className="text-neutral-400">
          {debtManagement?.MoneyToSetAside.AvailableFundsConsideration || "Details will be updated here."}
        </p>
      </div>
    </div>
  );
};

export default DebtDashboard;
