"use client";
import ExpenseDashboard from "@/app/components/Dashboard-Components/ExpenseDashboard";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import React from "react";
import { useRecoilValue } from "recoil";


const Expense = () => {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
    
  return (
    <>
      <ExpenseDashboard
        category={userFinancialInfo}
        expense={userFinancialInfo.expenseAnalysis}
        debt={userFinancialInfo.debtManagement}
        investment={userFinancialInfo.investmentAdvice}
      />
    </>
  );
};

export default Expense;
