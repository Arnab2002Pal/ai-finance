import { RiskTolerance, UserFinancialInfo } from "@/app/interface/userInterface";
import { atom } from "recoil";

export const userFinancialInfoState = atom<UserFinancialInfo>({
  key: "userFinancialInfoState",
  default: {
    expenseAnalysis: {
      monthlyExpenses: 0,
      monthlyNetEarnings: 0,
      monthlyDebtPayments: 0,
      totalCurrentSavings: 0,
      totalMonthlySavings: 0,
      advice: "",
    },
    investmentAdvice: {
      riskTolerance: RiskTolerance.default,
      investments: []
    },
    savingPlan: {
      annualSavings: 0,
      totalMonthlySavings: 0,
      percentageOfSalarySaved: 0,
      advice: "",
    },
    debtManagement: {
      totalExistingDebt: 0,
      recommendedDebtPayment: 0,
      advice: "",
    },
    goalRoadmap: {
      longTermGoals: "",
      shortTermGoals: "",
      advice: "",
    },
    structuredPlan: [],
    growthAnalysis: {
      currentGrowthPercentage: 0,
      potentialGrowthPercentage: 0,
    },
    reEvaluation: {
      timeframe: "",
    },
    summary: {
      nextSteps: "",
      currentSituation: "",
      expectedOutcomes: "",
      keyRecommendations: "",
      reEvaluationTimeframe: 0,
    },
  },
});
