import { DebtManagement, ExpenseAnalysis, InvestmentAdvice } from "@/interface/userInterface";
import DoughnutChart from "./ui/doughnut";

export const Dashboard = ({ expense, debt, investment }: {
  expense?: ExpenseAnalysis,
  debt?: DebtManagement,
  investment?: InvestmentAdvice,
}) => {

  return (
    <div className="flex flex-1">

      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-row gap-2 flex-1 w-full h-full">

        {/* Left Side (3/5 width) */}
        <div className="flex flex-col gap-2 flex-1 w-3/5">

          <div className="flex gap-2 w-full">

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-green-950 to-neutral-900 ">
              <div>Total Earned:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium text-green-500">
                {expense?.MonthlyEarning}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-red-950 to-neutral-900 ">
              <div>Total Expense:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium text-red-500">
                {expense?.MonthlyExpenses}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-zinc-800 to-neutral-900 ">
              <div>Total Saved:</div>
              <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                {expense?.TotalRemainingMoneySaved}
              </div>
            </div>

          </div>

          {/* Placeholder for additional content on the left */}
          <div className="flex gap-2 flex-1 w-full ">
            <div className="h-full w-full flex justify-center items-center rounded-lg bg-neutral-800">
              <DoughnutChart expense={expense ?? {}} />
            </div>
            <div className="h-full w-full rounded-lg bg-neutral-800 animate-pulse">
            </div>
          </div>

        </div>

        {/* Right Side Big Box (2/5 width) */}
        <div className="flex flex-col items-center gap-2 w-1/4 bg-neutral-800 rounded-lg p-10">
          <div className="text-3xl font-semibold text-white">
            Big Box Content
          </div>
          <div className="text-white text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cumque reiciendis enim deleniti ex ullam?
            {/* <DoughnutChart expense={expense ?? {}}/> */}
          </div>
        </div>

      </div>
    </div>
  );
};
