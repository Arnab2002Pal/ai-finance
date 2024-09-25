"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserData } from "@/interface/userInterface";
import { Dashboard } from "@/app/components/Dashboard";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const router = useRouter();
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  
  return (
    <Dashboard
      category={userFinancialInfo}
      expense={userFinancialInfo.expenseAnalysis}
      debt={userFinancialInfo.debtManagement}
      investment={userFinancialInfo.investmentAdvice}
    />
  );
}

