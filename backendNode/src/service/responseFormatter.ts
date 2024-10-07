import { z } from "zod";

export const UserResponse = z.object({
    ExpenseAnalysis: z.object({
        MonhtlyEarning: z.number(),
        TotalInvestedAmount: z.number(),
        MonthlyExpenses: z.number(),
        MonthlyDebt: z.number(),
        MoneySaved: z.number(),
        Advice: z.string(),
    }),
    InvestmentAdvice: z.object({
        WhereToInvest: z.object({
            Allocation1: z.object({
                Name: z.string(),
                PercentageAllocation: z.string(),
                Amount: z.number(),
                AssetClass: z.string(),
            }),
            Allocation2: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation3: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation4: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation5: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation6: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation7: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
            Allocation8: z
                .object({
                    Name: z.string(),
                    PercentageAllocation: z.string(),
                    Amount: z.number(),
                    AssetClass: z.string(),
                })
                .optional(),
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
        MoneyToSetAside: z.object({
            TimePeriod: z.string(),
            SuggestedAmount: z.number(),
            AvailableFundsConsideration: z.union([z.string(), z.number()]),
        }),
        Advice: z.object({
            DebtStrategy: z.string(),
            Priority: z.string(),
        }),
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
            YearsToInvest: z.number().optional(),
            EstimatedAnnualRequirement: z.number(),
            Advice: z.string(),
        }),
    }),
    StructuredPlan: z.object({
        Step1: z.string().optional(),
        Step2: z.string().optional(),
        Step3: z.string().optional(),
        Step4: z.string().optional(),
        Step5: z.string().optional(),
        Step6: z.string().optional(),
        Step7: z.string().optional(),
    }),
    Growth: z.object({
        OverallCurrentGrowthPercentage: z.string(),
        PotentialGrowthPercentage: z.string(),
    }),
    Summary: z.string(),
});
