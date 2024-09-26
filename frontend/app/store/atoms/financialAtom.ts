import { UserFinancialInfo } from "@/interface/userInterface";
import { atom } from "recoil";

export const userFinancialInfoState = atom<UserFinancialInfo>({
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
