import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import dotenv from 'dotenv';
import { UserInput } from '../interface/inputInterface';
dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

const UserResponse = z.object({
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


export async function gptCall({
    country,
    age,
    occupation,
    monthly_salary,
    total_expenses,
    total_investment,
    short_term_goal,
    long_term_goal,
    debt,
    risk_tolerance
}: UserInput) {

    const completion = await client.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
                        Role: Financial Advisor
                        Task: Provide clear, concise financial advice based on the user's data. Ensure the output follows the structure provided below, and create a well-structured, actionable plan. 
                        - The output must follow this exact structure, without omissions or changes.
                        - Return the output in JSON format.
                        - If any field is empty declare it with emplty string

                        - **Growth**:
                            - **Overall Current Growth Percentage**: <Calculate the current growth in percentage based on the user's existing investments and savings.>
                            - **Potential Growth Percentage**: <Estimate the potential growth in percentage after following the given investment and savings structure.>
                        - Add **at least 2-6 investment options** if necessary, ensuring that the options are diversified across asset classes and match the user's risk tolerance.
                        -  When suggesting investments, consider a diverse range of asset classes based on total salary and saving in hand,including but not limited to:
                            - Mutual funds (small-cap, large-cap, hybrid etc.)
                            - Stocks (small-cap, mid-cap, large-cap etc.)
                            - Real estate
                            - Bonds (government or corporate etc.)
                            - Commodities (gold, silver, etc.)
                            - Cryptocurrencies
                            - Exchange Traded Funds (ETFs)
                            - Any other alternative investments that may fit the user's profile.
                            - Be sure to specify the asset class clearly and include any relevant details about why these options are suitable for the user's goals and risk tolerance.
                        - Provide an investment rationale based on the user's risk tolerance, detailing how each option supports specific goals.
                        - Outline the diversification strategy, explaining how the investments are spread across different asset classes to manage risk effectively.
                        - Continue adding steps to create a clear, actionable plan.
                        - Include more steps to structure plan if needed.

                        Structure:
                        {
                            "ExpenseAnalysis": {
                                "MonhtlyEarning": "<Total Earning>",
                                "MonthlyExpenses": "<Total Expenses>",
                                "TotalDebt": "<Total Debt>",
                                "TotalInvestedAmount": "<Total Invested>",
                                "TotalRemainingMoneySaved": "<Total Remaining Money Saved>",
                                "Advice": "<Expense-related advice>"
                            },
                            "InvestmentAdvice" <Add more investment options if needed> : {
                                "WhereToInvest": {
                                    "Option1": {
                                        "Name": "<Investment Option 1>",
                                        "PercentageAllocation": "<Percentage Allocation>"
                                        "Amount": "₹<Amount>",
                                        "AssetClass": "Specify the asset class, e.g., real estate, bonds, gold, cryptocurrencies, or any other alternative investment type."
                                    },
                                    "Option2": {
                                        "Name": "<Investment Option 2>",
                                        "PercentageAllocation": "<Percentage Allocation>"
                                        "Amount": "₹<Amount>",
                                        "AssetClass": "<Asset Class>"
                                    },
                                    <If needed add more options>
                                    "GoalAlignment": "<Investment rationale for short-term and long-term goals>",
                                    "StrategyRationale": "<Why this investment strategy>",
                                    "DiversificationStrategy": "<Diversification strategy>",
                                    "Advice": "<Personalized investment advice>"
                            },
                            "SavingPlan": {
                                "TotalMonthlySaving": "₹<Total Monthly Saving>",
                                "AnnualSaving": "₹<Annual Saving>",
                                "PercentageOfSalarySaved": "<Percentage of Salary Saved>",
                                "Advice": "<Saving-related advice>"
                            },
                            "DebtManagement": {
                                "TotalDebt": "₹<Total Debt>",
                                "MoneyToSetAside": "₹<Amount>",
                                "Advice": "<Debt-related advice>"
                            },
                            "GoalRoadmap": {
                                "ShortTermGoal": {
                                    "Description": "<Goal Description>",
                                    "TargetAmount": "₹<Target Amount>",
                                    "MonthlySavingsNeeded": "₹<Monthly Savings>",
                                    "Advice": "<Short-term goal advice>"
                                },
                                "LongTermGoal": {
                                    "Description": "<Goal Description>",
                                    "CurrentAge": "<Current Age>",
                                    "YearsToInvest": "<Years to Invest (Add if requried)>",
                                    "EstimatedAnnualRequirement": "₹<Estimated Annual Requirement>",
                                    "Advice": "<Long-term goal advice>"
                                }
                            },
                            "StructuredPlan": {
                                "Step1": "<Step 1 in the savings/investment plan>",
                                "Step2": "<Step 2>",
                                "Step3": "<Step 3>"
                                <If needed add more steps>
                            },
                            "Growth": {
                                "OverallCurrentGrowthPercentage": "<Provide a single percentage value, e.g., 10%>",
                                "PotentialGrowthPercentage": "<Provide a single percentage value, e.g., 15% or 20%>"
                            },
                            "Summary": "<Summary advice tailored to the user's financial situation and goals>"
                        }`
            },
            {
                role: "user",
                content: `
                    Location: ${country}
                    Occupation: ${occupation}
                    Age: ${age}
                    In-Hand Salary: ${monthly_salary}
                    Expenses: ${total_expenses}
                    Investments: ${total_investment}
                    Short-term goal: ${short_term_goal}
                    Long-term goal: ${long_term_goal}
                    Risk tolerance: ${risk_tolerance}
                    Debt: ${debt}
                `,
            },
        ],
        response_format: zodResponseFormat(UserResponse, "UserResponse"),
    });

    return {
        result: completion,
        response: completion.choices[0].message.parsed,
    }
}

