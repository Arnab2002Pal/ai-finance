import {
  DebtManagement,
  ExpenseAnalysis,
  InvestmentAdvice,
  UserFinancialInfo,
} from "@/interface/userInterface";
import DoughnutChart from "./ui/doughnut";
import { NavbarBox } from "./Navbar";
import BarChart from "./ui/barChart";
import ApexChart from "./ui/barChart";
import { AnalysisSection } from "./ui/analysis-section";

export const Dashboard = ({
  category,
  expense,
  debt,
  investment,
}: {
  category?: UserFinancialInfo;
  expense?: ExpenseAnalysis;
  debt?: DebtManagement;
  investment?: InvestmentAdvice;
}) => {
  console.log(category?.structuredPlan);

  return (
    <>
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-row gap-2 flex-1 w-full h-full overflow-y-auto">
          {/* Left Side (3/5 width) */}
          <div className="flex flex-col gap-2 flex-1 w-3/5">
            <div className="flex gap-2 w-full">
              <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-green-950 to-neutral-900 ">
                <div>Montly Earned:</div>
                <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                  {expense?.MonthlyEarning}
                </div>
              </div>

              <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-red-950 to-neutral-900 ">
                <div>Monthly Expense:</div>
                <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                  {expense?.MonthlyExpenses}
                </div>
              </div>

              <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-yellow-700 to-neutral-900 ">
                <div>Total Investment:</div>
                <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                  {expense?.TotalInvestedAmount}
                </div>
              </div>

              <div className="flex flex-col justify-center items-start px-10 h-32 w-full rounded-lg bg-gradient-to-t from-zinc-800 to-neutral-900 ">
                <div>Monthly Saved:</div>
                <div className="w-full h-14 flex flex-row justify-start items-center text-5xl font-medium ">
                  {expense?.TotalRemainingMoneySaved}
                </div>
              </div>
            </div>

            {/* Placeholder for additional content on the left */}
            <div className="flex gap-2 flex-1 w-full h-full">
              <div className="w-full h-96 rounded-lg bg-neutral-800 flex justify-center items-center overflow-hidden">
                <BarChart />
              </div>
              <div className="w-full p-6 rounded-lg bg-neutral-800 flex flex-col justify-start items-start overflow-hidden">
                <div className="text-3xl font-bold">
                  <h1>Structured Investment Plan</h1>
                </div>
                <div className="mt-6 max-h-64 overflow-auto scrollbar-hide">
                  {category?.structuredPlan &&
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
                    )}
                </div>
              </div>
            </div>
            <div className="h-full w-full rounded-lg bg-neutral-800 flex justify-center items-center">
              <AnalysisSection category={category} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
