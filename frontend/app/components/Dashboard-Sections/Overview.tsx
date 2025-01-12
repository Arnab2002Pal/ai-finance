import React, { useState } from "react";
import { UserFinancialInfo } from "@/app/interface/userInterface";
import {
  FaArrowRight,
  FaCheck,
  FaLightbulb,
  FaChartPie,
  FaPiggyBank,
  FaBullseye,
  FaCoins,
} from "react-icons/fa";
import "./component.css"
import BarChart from "../ui/barChart";
import Summary from "./Summary";
import Expense from "./Expense";
import Investment from "./Investment";
import SavingPlan from "./SavingPlan";
import Debt from "./Debt";
import Goal from "./Goal";
import { SummaryGraph } from "./Graphs/SummaryGraph";
import ExpenseDoughnut from "./Graphs/ExpenseDougnut";
import SavingDoughnut from "./Graphs/SavingDoughnut";
import SavingsProgress from "./Graphs/SavingDoughnut";
import DebtChart from "./Graphs/DebtGraph";

const FinancialOverview = ({ category }: { category?: UserFinancialInfo }) => {
  const [activeSection, setActiveSection] = useState("summary");

  const sections = [
    { id: "summary", label: "Summary", icon: FaLightbulb },
    { id: "expenseAnalysis", label: "Expense Analysis", icon: FaPiggyBank },
    { id: "investmentAdvice", label: "Investment Advice", icon: FaCoins },
    { id: "savingPlan", label: "Saving Plan", icon: FaBullseye },
    { id: "debtManagement", label: "Debt Management", icon: FaChartPie },
    { id: "goalRoadmap", label: "Goal Roadmap", icon: FaArrowRight },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "summary":
        return (
          <Summary summary={category?.summary!} />
        )
      case "expenseAnalysis":
        return (
          <Expense expense={category?.expenseAnalysis!} />
        );
      case "investmentAdvice":
        return (
          <Investment investment={category?.investmentAdvice!} />
        );
      case "savingPlan":
        return (
          <SavingPlan savings={category?.savingPlan!} structurePlan={category?.structuredPlan!} />
        );
      case "debtManagement":
        return (
          <Debt debt={category?.debtManagement!} />
        );
      case "goalRoadmap":
        return (
          <Goal goal={category?.goalRoadmap!} nextStep={category?.summary!} />
        );

      default:
        return <p className="text-gray-300">Select a section to view details.</p>;
    }
  };

  const renderGraph = () => {
    switch (activeSection) {
      case "summary":
        return (
          <>
            <div className="mt-6 bg-neutral-700 p-6 rounded-lg shadow-md">

              <h2 className="text-gold text-2xl md:text-3xl font-bold mb-2">📊 Growth Insights</h2>
              <div className="mt-6 w-full h-full flex justify-around items-center">
                <div className="w-full">
                  <div className="bg-neutral-900 md:px-20 rounded-xl w-full h-full flex flex-col md:flex-row justify-around items-center gap-2">
                    <div className="w-full md:w-5/12 py-6 px-2 md:px-0">
                      <SummaryGraph />
                    </div>
                    <div className=" w-full md:w-5/12 py-6 px-4 md:px-6 rounded-lg shadow-lg text-white text-center md:text-right">
                      <p className="md:text-xl leading-relaxed mb-4">
                        Your current growth stands at <span className="text-green-400 font-bold">{category?.growthAnalysis.currentGrowthPercentage}%</span>, but there&apos;s potential to reach <span className="text-yellow-400 font-bold">+{category?.growthAnalysis.potentialGrowthPercentage}%</span>.
                      </p>
                      <p className="md:text-xl leading-relaxed mb-4">
                        By refining your <span className="text-blue-400">investment strategy</span> and making small adjustments, you could unlock exciting new opportunities for growth! 💼
                      </p>
                      <p className="md:text-xl font-medium">
                        💡 Remember, small, consistent steps can lead to <span className="text-green-400">big financial gains</span> over time. Let&apos;s aim to maximize your potential and achieve long-term success! 📈
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </>
        )
      case "expenseAnalysis":
        return (
          <>
            <div className="mt-6 bg-neutral-700 p-6 rounded-lg shadow-md">
              <h2 className="text-gold text-2xl md:text-3xl font-bold mb-2">📊 Expense Insights</h2>
              <div className="mt-6 w-full h-full flex justify-around items-center">
                <div className="w-full">
                  <div className="bg-neutral-900 md:px-20 rounded-xl w-full h-full flex flex-col md:flex-row justify-around items-center gap-2">
                    <div className="w-full md:w-5/12 py-6 px-2 md:px-0 ">
                      <ExpenseDoughnut financialData={category?.expenseAnalysis!} />
                    </div>
                    <div className="w-full md:w-5/12 py-6 px-4 md:px-6 rounded-lg shadow-lg text-white text-center md:text-right">
                      <p className="md:text-xl leading-relaxed mb-4">
                        Your monthly earnings is <span className="text-yellow-300 font-bold">₹{category?.expenseAnalysis?.monthlyNetEarnings}</span>.
                        However, <span className="text-[#8B8000] font-bold">₹{category?.expenseAnalysis?.monthlyExpenses}</span> is going towards expenses, and <span className="text-yellow-600 font-bold">₹{category?.expenseAnalysis?.monthlyDebtPayments}</span> is allocated to debt payments.
                      </p>
                      <p className="md:text-xl leading-relaxed mb-4">
                        After covering your expenses and debt, you’re left with <span className="text-violet-400 font-bold">₹{category?.expenseAnalysis.totalMonthlySavings}</span>.
                        Consider optimizing your spending to increase your savings and reduce financial stress. 🧩
                      </p>
                      <p className="md:text-xl font-medium">
                        💡 Remember, effective expense management is the foundation for building a <span className="text-green-400">strong financial future</span>. Let’s work towards achieving a balance between your income and expenses for long-term growth! 🚀
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case "investmentAdvice":
        return (
          <></>
        );
      case "savingPlan":
        return (
          <div className="mt-6 bg-neutral-700 p-6 rounded-lg shadow-md">
            <h2 className="text-gold text-2xl md:text-3xl font-bold mb-2">📊 Savings Insights</h2>
            <div className="mt-6 w-full h-full flex justify-around items-center">
              <div className="w-full">
                <div className="bg-neutral-900 md:px-20 rounded-xl w-full h-full flex flex-col md:flex-row justify-around items-center gap-2">
                  <div className="w-full md:w-5/12 py-6 px-2 md:px-0 ">
                    <SavingsProgress savings={category?.savingPlan!}/>
                  </div>
                  <div className="w-full md:w-5/12 py-6 px-4 md:px-6 rounded-lg text-white text-center md:text-right">
                    <p className="md:text-xl leading-relaxed mb-4">
                      Your total savings have reached <span className="text-yellow-400 font-bold">₹{category?.savingPlan.annualSavings}</span>, with <span className="text-yellow-300 font-bold">₹{category?.savingPlan.totalMonthlySavings}</span> being added each month.
                    </p>
                    <p className="md:text-xl leading-relaxed mb-4">
                      Consistent saving is crucial for financial stability. Diversify your savings by investing for growth and maintaining an emergency fund to build a secure future.
                    </p>
                    <p className="md:text-xl font-medium">
                      💡 Building a strong savings habit today will empower you to meet future financial goals and create the foundation for long-term wealth. Let’s keep that momentum going! 📈
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      case "debtManagement":
        return (
          <div className="mt-6 bg-neutral-700 p-6 rounded-lg shadow-md">
            <h2 className="text-gold text-2xl md:text-3xl font-bold mb-2">📊 Debt Insights</h2>
            <div className="mt-6 w-full h-full flex justify-around items-center">
              <div className="w-full">
                <div className="bg-neutral-900 md:px-20 rounded-xl w-full h-full flex flex-col md:flex-row justify-around items-center gap-2">
                  <div className="w-full md:w-5/12 py-6 px-2 md:px-0 ">
                    <DebtChart debt={category?.debtManagement!} />
                  </div>
                  <div className="w-full md:w-5/12 py-6 px-4 md:px-6 rounded-lg text-white text-center md:text-right">
                    <p className="md:text-xl leading-relaxed mb-4">
                      Your total debt stands at <span className="text-yellow-400 font-bold">₹{category?.debtManagement?.totalExistingDebt}</span>, with <span className="text-yellow-300 font-bold">₹{category?.debtManagement?.recommendedDebtPayment}</span> paid monthly.
                    </p>
                    <p className="md:text-xl leading-relaxed mb-4">
                      Managing debt is essential for financial freedom. Focus on clearing high-interest debts first to reduce stress.
                    </p>
                    <p className="md:text-xl font-medium">
                      💡 Stay disciplined with debt payments to pave the way for a debt-free future! 🚀
                    </p>
                  </div>


                </div>
              </div>
            </div>
          </div>
        );
      case "goalRoadmap":
        return (
          <></>
        );

      default:
        return <p className="text-gray-300">Select a section to view details.</p>;
    }
  };

  return (
    <div className="p-6 w-full h-full overflow-y-auto scrollbar-hide bg-neutral-900 text-white rounded-t-xl md:rounded-tr-none shadow-lg flex flex-col gap-6">
      {/* Section Navigation */}
      <div className="flex gap-4 flex-wrap justify-center md:justify-start">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg 
              ${activeSection === section.id ? "bg-gold text-stone-900 font-medium" : "bg-neutral-800 text-white"} 
              ${activeSection === section.id ? "shadow-lg" : ""} 
              sm:w-auto w-full`}

            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="text-xl" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="bg-neutral-800 p-6 rounded-lg shadow-md">{renderContent()}</div>

      {
        activeSection && (
          <div>
            {renderGraph()}
          </div>
        )
      }

    </div>
  );
};

export default FinancialOverview;
