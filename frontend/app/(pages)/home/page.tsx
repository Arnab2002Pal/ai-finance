"use client";
import React, { useState } from "react";
import { Overview } from "@/app/components/Dashboard-Components/Overview";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";
import { selectedDashboardState } from "@/app/store/atoms/dashboardAtom";

export default function Home() {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);
  const dashboardConfig = useRecoilValue(selectedDashboardState);
    
  return (
    <>
      <Overview
        category={userFinancialInfo}
        expense={userFinancialInfo.expenseAnalysis}
      />
    </>
  );
}
