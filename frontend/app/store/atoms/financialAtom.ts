import { atom } from "recoil";

export const userFinancialInfoState = atom({
  key: "userFinancialInfoState", 
  default: {
    expenseAnalysis: {},
    debtManagement: {},
    investmentAdvice: {},
    goalRoadmap: {},
    growth: {},
    savingPlan: {},
    structuredPlan: {},
    summary: "",
  }
});
