import React from "react";
import {
  ExpenseAnalysis,
  UserFinancialInfo,
} from "@/app/interface/userInterface";
import BarChart from "../ui/barChart";
import InvestmentDashboard from "./InvestmentDashboard";
import SavingDashboard from "./SavingDashboard";
import GoalDashboard from "./GoalDashboard";
import DebtDashboard from "./DebtDashboard";

export const Overview = ({
  category,
  expense,
}: {
  category?: UserFinancialInfo;
  expense?: ExpenseAnalysis;
}) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-row gap-2 flex-1 w-full h-full overflow-y-auto">
        {/* Left Side (3/5 width) */}
        <div className="flex flex-col gap-7 flex-1 w-3/5">
          <div className="flex flex-col gap-2 w-full md:grid md:grid-cols-2 lg:flex lg:flex-row">
            {/* Financial Summary Cards */}
            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-green-700 to-neutral-900">
              <div>Monthly Income:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                {expense?.MonhtlyEarning}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-red-700 to-neutral-900">
              <div>Monthly Expenses:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                {expense?.MonthlyExpenses}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-yellow-700 to-neutral-900">
              <div>Total Investments:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                {expense?.TotalInvestedAmount}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-zinc-700 to-neutral-900">
              <div>Monthly Savings:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                {expense?.MoneySaved}
              </div>
            </div>
          </div>

          {/* Growth and Structure Section */}
          <h1 className="text-4xl font-bold mt-4">Growth and Improvement Structure</h1>
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full h-full">
            {/* Chart Section */}
            <div className="w-full h-96 rounded-lg bg-neutral-800 shadow-lg flex justify-center items-center overflow-hidden">
              <BarChart />
            </div>

            {/* Structured Investment Plan Section */}
            <div className="w-full p-6 rounded-lg bg-neutral-800 shadow-lg flex flex-col justify-start items-start">
              <h1 className="text-3xl font-bold text-white mb-4">Structured Investment Plan</h1>

              <div className="mt-2 max-h-64 overflow-auto scrollbar-hide flex-grow">
                {category?.structuredPlan ? (
                  Object.entries(category.structuredPlan).map(([key, value]) => (
                    <div key={key} className="mb-4 p-4 bg-neutral-700 rounded-lg transition duration-200 hover:bg-neutral-600 cursor-default">
                      <p className="text-xl font-bold text-white">{key}:</p>
                      <p className="text-neutral-400">{value as React.ReactNode}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-400">No structured plan available.</p>
                )}
              </div>
            </div>
          </div>

          {/* Overview Sections */}
          <h1 className="text-4xl font-bold mt-4 ">Investment Overview</h1>
          <InvestmentDashboard />

          <h1 className="text-4xl font-bold mt-4 mb-[-1.5rem]">Saving Overview</h1>
          <SavingDashboard />

          <h1 className="text-4xl font-bold mt-4 mb-[-1.5rem]">Goal Overview</h1> {/* Reduced margin-bottom */}
          <GoalDashboard />

          <h1 className="text-4xl font-bold mt-4 mb-[-0.5rem]">Debt Management Overview</h1>
          <DebtDashboard />

        </div>
      </div>
    </div>
  );
};
