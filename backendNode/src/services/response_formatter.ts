import { SchemaType } from "@google/generative-ai";

export const schema = {
    description: "Financial report tailored to the user's financial data and priorities",
    type: SchemaType.OBJECT,
    properties: {
        expenseAnalysis: {
            type: SchemaType.OBJECT,
            description: "Analysis of user's expenses and actionable advice",
            properties: {
                monthlyNetEarnings: { type: SchemaType.NUMBER, description: "Monthly net earnings", nullable: false },
                totalCurrentSavings: { type: SchemaType.NUMBER, description: "Total current savings", nullable: false },
                monthlyExpenses: { type: SchemaType.NUMBER, description: "Monthly expenses excluding debt payments", nullable: false },
                monthlyDebtPayments: { type: SchemaType.NUMBER, description: "Monthly debt payments excluding general expenses", nullable: false },
                totalMonthlySavings: { type: SchemaType.NUMBER, description: "Net earnings minus expenses and debt payments", nullable: false },
                advice: { type: SchemaType.STRING, description: "Gist of specific advice on reducing expenses", nullable: true },
            },
            required: ["monthlyNetEarnings", "totalCurrentSavings", "monthlyExpenses", "monthlyDebtPayments", "totalMonthlySavings"],
        },
        investmentAdvice: {
            type: SchemaType.OBJECT,
            description: "Detailed investment advice with risk tolerance and allocation percentages",
            properties: {
                riskTolerance: {
                    type: SchemaType.STRING,
                    description: "Type of risk: Aggressive, Moderate, or Conservative",
                    nullable: false,
                },
                investments: {
                    type: SchemaType.ARRAY,
                    description: "List of investment options with allocation percentages and amounts",
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            investmentName: {
                                type: SchemaType.STRING,
                                description: "Name of the investment option",
                                nullable: false,
                            },
                            assetClass: {
                                type: SchemaType.STRING,
                                description: "Type of asset (e.g., stocks, bonds)",
                                nullable: false,
                            },
                            percentageAllocation: {
                                type: SchemaType.NUMBER,
                                description: "Percentage of total savings allocated (e.g., 20 for 20%)",
                                nullable: false,
                            },
                            amountAllocated: {
                                type: SchemaType.NUMBER,
                                description: "Amount allocated to the investment (e.g., 600, 200)",
                                nullable: false,
                            },
                        },
                        required: ["investmentName", "assetClass", "percentageAllocation", "amountAllocated"],
                    },
                },
            },
            required: ["riskTolerance", "investments"],
        },

        savingPlan: {
            type: SchemaType.OBJECT,
            description: "Savings plan overview and advice",
            properties: {
                totalMonthlySavings: { type: SchemaType.NUMBER, description: "Total savings per month", nullable: false },
                annualSavings: { type: SchemaType.NUMBER, description: "Total savings per year", nullable: false },
                percentageOfSalarySaved: { type: SchemaType.NUMBER, description: "Percentage of income saved monthly", nullable: false },
                advice: { type: SchemaType.STRING, description: "Strategies for maximizing savings", nullable: true },
            },
            required: ["totalMonthlySavings", "annualSavings", "percentageOfSalarySaved"],
        },
        debtManagement: {
            type: SchemaType.OBJECT,
            description: "Debt management strategy and recommendations",
            properties: {
                totalExistingDebt: { type: SchemaType.NUMBER, description: "User's total existing debt", nullable: false },
                recommendedDebtPayment: { type: SchemaType.NUMBER, description: "Recommended monthly debt payment", nullable: false },
                advice: { type: SchemaType.STRING, description: "Debt repayment strategies", nullable: true },
            },
            required: ["totalExistingDebt", "recommendedDebtPayment"],
        },
        goalRoadmap: {
            type: SchemaType.OBJECT,
            description: "Roadmap for achieving financial goals",
            properties: {
                shortTermGoals: { type: SchemaType.STRING, description: "Strategy for short-term goals", nullable: true },
                longTermGoals: { type: SchemaType.STRING, description: "Strategy for long-term goals", nullable: true },
                advice: { type: SchemaType.STRING, description: "Gist of additional guidance for goal adjustment", nullable: true },
            },
            required: [],
        },
        structuredPlan: {
            type: SchemaType.ARRAY,
            description: "Step-by-step implementation plan",
            items: { type: SchemaType.STRING, description: "Individual steps in the plan" },
        },
        growthAnalysis: {
            type: SchemaType.OBJECT,
            description: "Analysis of financial growth potential",
            properties: {
                currentGrowthPercentage: { type: SchemaType.NUMBER, description: "Current growth percentage", nullable: false },
                potentialGrowthPercentage: { type: SchemaType.NUMBER, description: "Potential growth percentage", nullable: false },
            },
            required: ["currentGrowthPercentage", "potentialGrowthPercentage"],
        },
        reEvaluation: {
            type: SchemaType.OBJECT,
            description: "Recommended timeframe for re-evaluation",
            properties: {
                timeframe: { type: SchemaType.STRING, description: "Recommended re-evaluation timeframe", nullable: false },
            },
            required: ["timeframe"],
        },
        summary: {
            type: SchemaType.OBJECT,
            description: "Concise summary of the financial report",
            properties: {
                currentSituation: { type: SchemaType.STRING, description: "User's current financial situation", nullable: false },
                keyRecommendations: { type: SchemaType.STRING, description: "Key tailored recommendations", nullable: false },
                expectedOutcomes: { type: SchemaType.STRING, description: "Expected outcomes of following the plan", nullable: false },
                nextSteps: { type: SchemaType.STRING, description: "Immediate next steps", nullable: false },
                reEvaluationTimeframe: { type: SchemaType.NUMBER, description: "Re-evaluation timeframe in months", nullable: true },
            },
            required: ["currentSituation", "keyRecommendations", "expectedOutcomes", "nextSteps"],
        },
    },
    required: ["expenseAnalysis", "investmentAdvice", "savingPlan", "debtManagement", "goalRoadmap", "structuredPlan", "growthAnalysis", "reEvaluation", "summary"],
};
