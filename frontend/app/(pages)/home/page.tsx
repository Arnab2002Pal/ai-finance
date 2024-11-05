"use client";
import React from "react";
import { Overview } from "@/app/components/Dashboard-Components/Overview";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);

  return (
    <>
      <Overview
        category={userFinancialInfo}
        expense={userFinancialInfo.expenseAnalysis}
      />
    </>
  );
}
