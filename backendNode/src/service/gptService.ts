import { Error_Message } from "../interface/enum";
import { UserInput } from "../interface/inputInterface";
import { gptCall } from "./openai";

export const generateFinancialAdvice = async (gptInput: UserInput) => {
    try {
        const { response, result } = await gptCall(gptInput);
        return {
            expenseAnalysis: response?.ExpenseAnalysis || {},
            investmentAdvice: response?.InvestmentAdvice || {},
            savingPlan: response?.SavingPlan || {},
            debtManagement: response?.DebtManagement || {},
            goalRoadmap: response?.GoalRoadmap || {},
            structuredPlan: response?.StructuredPlan || {},
            growth: response?.Growth || {},
            summary: response?.Summary || "",
        };
    } catch (error) {
        throw new Error(Error_Message.GPT_ERROR);
    }
};
