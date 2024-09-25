"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserData } from "@/interface/userInterface";
import { Dashboard } from "@/app/components/Dashboard";

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);


  const { data: session, status } = useSession();

  
  // Destructure user financial info for easier access
  const {
    userFinancialInfo: {
      expenseAnalysis = {},
      debtManagement = {},
      investmentAdvice = {},
      goalRoadmap = {},
      growth = {},
      savingPlan = {},
      structuredPlan = {},
      summary = "",
    } = {},
  } = userData;

  return (
    <Dashboard
      category={userData.userFinancialInfo}
      expense={userData.userFinancialInfo?.expenseAnalysis}
      debt={userData.userFinancialInfo?.debtManagement}
      investment={userData.userFinancialInfo?.investmentAdvice}
    />
  );
}
