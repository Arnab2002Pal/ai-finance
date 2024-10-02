import { z } from "zod";

export const UserResponse = z.object({
    ExpenseAnalysis: z.object({
        MonthlyEarning: z.number(),
        MonthlyExpenses: z.number(),
        TotalDebt: z.number(),
        TotalInvestedAmount: z.number(),
        TotalRemainingMoneySaved: z.number(),
        Advice: z.string(),
    }),
    InvestmentAdvice: z.object({
        WhereToInvest: z.object({
            Option1: z.object({
                Name: z.string(),
                PercentageAllocation: z.string(),
                Amount: z.number(),
                AssetClass: z.string(),
            }),
            Option2: z.object({
                Name: z.string(),
                PercentageAllocation: z.string(),
                Amount: z.number(),
                AssetClass: z.string(),
            }),
            GoalAlignment: z.string(),
            StrategyRationale: z.string(),
            DiversificationStrategy: z.string(),
            Advice: z.string(),
        }),
    }),
    SavingPlan: z.object({
        TotalMonthlySaving: z.number(),
        AnnualSaving: z.number(),
        PercentageOfSalarySaved: z.string(),
        Advice: z.string(),
    }),
    DebtManagement: z.object({
        TotalDebt: z.number(),
        MoneyToSetAside: z.number(),
        Advice: z.string(),
    }),
    GoalRoadmap: z.object({
        ShortTermGoal: z.object({
            Description: z.string(),
            TargetAmount: z.number(),
            MonthlySavingsNeeded: z.number(),
            Advice: z.string(),
        }),
        LongTermGoal: z.object({
            Description: z.string(),
            CurrentAge: z.number(),
            YearsToInvest: z.number(),
            EstimatedAnnualRequirement: z.number(),
            Advice: z.string(),
        }),
    }),
    StructuredPlan: z.object({
        Step1: z.string(),
        Step2: z.string(),
        Step3: z.string(),
    }),
    Growth: z.object({
        OverallCurrentGrowthPercentage: z.string(),
        PotentialGrowthPercentage: z.string(),
    }),
    Summary: z.string(),
});