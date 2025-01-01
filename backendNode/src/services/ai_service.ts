import { Error_Message } from "../interface/enum";
import { UserInput } from "../interface/input_interface";
import { generateResult } from "./gemini";

export const generateFinancialAdvice = async (gptInput: UserInput) => {
    const transformedInput = `
        Country: ${gptInput.country}
        Age: ${gptInput.age}
        Occupation: ${gptInput.occupation}
        Monthly Income (Net): ${gptInput.monthly_income}
        Monthly Expenses (excluding debt payments): ${gptInput.monthly_expense}
        Monthly Debt Payments (excluding general expenses): ${gptInput.monthly_debt}
        Total Remaining Debt: ${gptInput.total_remaining_debt}
        Risk Tolerance (e.g., Conservative, Moderate, Aggressive): ${gptInput.risk_tolerance}
        Savings Goal Priorities: ${gptInput.goal_priorities}
        Amount of current savings (e.g. Savings, Stocks, Cash): ${gptInput.current_amount_savings}
        Short Term Goals: ${gptInput.short_term}
        Long Term Goals: ${gptInput.long_term}
    `

    try {
        const result = await generateResult(transformedInput);

        return {
            expenseAnalysis: result.expenseAnalysis,
            investmentAdvice: result.investmentAdvice,
            savingPlan: result.savingPlan,
            debtManagement: result.debtManagement,
            goalRoadmap: result.goalRoadmap,
            structuredPlan: result.structuredPlan,
            growthAnalysis: result.growthAnalysis,
            reEvaluation: result.reEvaluation,
            summary: result.summary
        };
    } catch (error) {
        throw new Error(Error_Message.GPT_ERROR);
    }
};
