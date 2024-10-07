import { UserFinancialInfo } from "@/app/interface/userInterface";
import { atom } from "recoil";

export const userFinancialInfoState = atom<UserFinancialInfo>({
  key: "userFinancialInfoState",
  default: {
    expenseAnalysis: {
      MonhtlyEarning: 0,
      TotalInvestedAmount: 0,
      MonthlyExpenses: 0,
      MonthlyDebt: 0,
      MoneySaved: 0,
      Advice: ""
    },
    debtManagement: {
      TotalDebt: 0,
      MoneyToSetAside: {
        TimePeriod: "",
        SuggestedAmount: 0,
        AvailableFundsConsideration: ""
      },
      Advice: {
        DebtStrategy: "",
        Priority: ""
      }
    }, 
    investmentAdvice: {
      WhereToInvest: {
        Allocation1: {
          Name: "",
          PercentageAllocation: "",
          Amount: 0,
          AssetClass: ""
        },
        GoalAlignment: "",
        StrategyRationale: "",
        DiversificationStrategy: "",
        Advice: ""
      }
    },
    goalRoadmap: {
      ShortTermGoal: {
        Description: "",
        TargetAmount: 0,
        MonthlySavingsNeeded: 0,
        Advice: ""
      },
      LongTermGoal: {
        Description: "",
        CurrentAge: 0,
        YearsToInvest: undefined,
        EstimatedAnnualRequirement: 0,
        Advice: ""
      }
    },
    growth: {
      OverallCurrentGrowthPercentage: "",
      PotentialGrowthPercentage: ""
    },
    savingPlan: {
      TotalMonthlySaving: 0,
      AnnualSaving: 0,
      PercentageOfSalarySaved: "",
      Advice: ""
    },
    structuredPlan: {},
    summary: "",
  }
});
