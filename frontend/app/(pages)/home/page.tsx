"use client";
import React from "react";
import FinancialOverview from "@/app/components/Dashboard-Sections/Overview";
import { userFinancialInfoState } from "@/app/store/atoms/financialAtom";
import { useRecoilValue } from "recoil";

export default function Home() {
  const userFinancialInfo = useRecoilValue(userFinancialInfoState);

  return (
    <div className="w-screen h-screen">
      <FinancialOverview
        category={userFinancialInfo}
      />
    </div>
  );
}
