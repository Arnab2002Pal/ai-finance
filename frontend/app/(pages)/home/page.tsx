"use client";
import React, { useState } from "react";
import { Overview } from "@/app/components/Dashboard-Components/Overview";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";
import { selectedDashboardState } from "@/app/store/atoms/dashboardAtom";
import ExpenseDashboard from "@/app/components/Dashboard-Components/ExpenseDashboard";
import InvestmentDashboard from "@/app/components/Dashboard-Components/InvestmentDashboard";
import DebtDashboard from "@/app/components/Dashboard-Components/DebtDashboard";
import SavingDashboard from "@/app/components/Dashboard-Components/SavingDashboard";
import GoalDashboard from "@/app/components/Dashboard-Components/GoalDashboard";

export default function Home() {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const dashboardConfig = useRecoilValue(selectedDashboardState);
  console.log(dashboardConfig);

  return (
    <>
      {/* {dashboardConfig === "Expense Analysis" ? (
        <ExpenseDashboard />
      ) : dashboardConfig === "Investment Analysis" ? (
        <InvestmentDashboard />
      ) : dashboardConfig === "Debt Management" ? (
        <DebtDashboard />
      ) : dashboardConfig === "Saving Plan" ? (
        <SavingDashboard />
      ) : dashboardConfig === "Goal Roadmap" ? (
        <GoalDashboard />
      ) : ( */}
      <Overview
        category={userFinancialInfo}
        expense={userFinancialInfo.expenseAnalysis}
        debt={userFinancialInfo.debtManagement}
        investment={userFinancialInfo.investmentAdvice}
      />
      {/* )} */}
    </>
  );
}
