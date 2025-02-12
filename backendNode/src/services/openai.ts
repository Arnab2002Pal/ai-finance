// import OpenAI from "openai";
// import { zodResponseFormat } from "openai/helpers/zod";
// import { UserResponse } from "./responseFormatter";
// import { UserInput } from "../interface/inputInterface";
// import dotenv from 'dotenv';

// dotenv.config();

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function gptCall({
//     country,
//     age,
//     occupation,
//     monthly_salary,
//     total_expenses,
//     total_investment,
//     short_term_goal,
//     long_term_goal,
//     debt,
//     risk_tolerance,
// }: UserInput) {
//     const completion = await client.beta.chat.completions.parse({
//         model: "gpt-4o-mini",
//         messages: [
//             {
//                 role: "system",
//                 content: `
//                 Role: Financial Advisor
//                 Task: You will be given set of user data. Based on the input, analyze and provide financial report based on there risk tolerance. This will give user a detailed report on how to invest, where to invest, how much to invest, and more.

//                 - Expense Analysis: Provide the following: Monthly Earning, Total Invested Amount, Monthly Expense(exclude monthly debt), Monthly debt(exclude monthly expense), Total remaining money saved, Advice.
//                 - Investment Advice: Provide the following:
//                     - Where to invest: Diversify and allocate the saved money to different investments across different assest class. Diversification strategy should be based on the user's risk tolerance and should be made after analyzing the user's savings only. Make sure calculate amount accurately according to the percentage and should not exceed the total amount saved.
//                     - Include Name of the investment and asset class, percentage allocation, and amount.
//                 - Saving Plan: Provide the following: Total Monthly Saving, Annual Saving, Percentage of salary saved. Include advice which explains on how to save more and in efficient way.
//                 - Debt Management: Provide the following: Total Debt, Money to Set Aside, Advice
//                 - Goal Roadmap: Provide the following: Short Term Goal, Long Term Goal based on investment made. Include advice on how to achieve the goal.
//                 - Structured Plan: Provide the following: Step 1, Step 2, Step 3 and so on if necessary
//                 - Growth: Provide the following:
//                     - Overall Current Growth Percentage: Calculate the current growth in percentage based on the user's report.
//                     - Potential Growth Percentage: Estimate the potential growth in percentage after following the given investment and savings structure
//                 - Summary: Provide a summary of the report tailored to the user's financial situation and goals.


//                 - The output must follow this exact structure, without omissions or changes.
//                 - Return the output in JSON format.
//                 - If any field is empty declare it with emplty string.
//                 - Ensure the output follows the below structure, and create a well-structured accordingly.

//                 Structure:
//                 {
//                     "ExpenseAnalysis": {
//                         "MonhtlyEarning": "<Total Earning>",
//                         "TotalInvestedAmount": "<Total Invested>",
//                         "MonthlyExpenses": "<Total Expenses>",
//                         "MonthlyDebt": "<Total Debt>",
//                         "MoneySaved": "<Total Remaining Money Saved>",
//                         "Advice": "<Expense-related advice>"
//                     },
//                     "InvestmentAdvice": {
//                         "WhereToInvest": {
//                             "Allocation1": {
//                                 "Name": "<Investment Option 1>",
//                                 "PercentageAllocation": "<Percentage Allocation>"
//                                 "Amount": "₹<Amount>",
//                                 "AssetClass": "Specify the asset class, e.g., real estate, bonds, gold, cryptocurrencies, or any other alternative investment type."
//                             },
//                             "Allocation2": {
//                                 "Name": "<Investment Option 2>",
//                                 "PercentageAllocation": "<Percentage Allocation>"
//                                 "Amount": "₹<Amount>",
//                                 "AssetClass": "<Asset Class>"
//                             },
//                             <Add more allocation as per requirement.>

//                             "GoalAlignment": "<Investment rationale for short-term and long-term goals>",
//                             "StrategyRationale": "<Why this investment strategy>",
//                             "DiversificationStrategy": "<Diversification strategy>",
//                             "Advice": "<Personalized investment advice>"
//                     },
//                     "SavingPlan": {
//                         "TotalMonthlySaving": "₹<Total Monthly Saving>",
//                         "AnnualSaving": "₹<Annual Saving>",
//                         "PercentageOfSalarySaved": "<Percentage of Salary Saved>",
//                         "Advice": "<Saving-related advice>"
//                     },
//                     "DebtManagement": {
//                         "TotalDebt": "₹<Total Debt>",
//                         "MoneyToSetAside": {
//                             "Time Period": "<For how long>"
//                           "SuggestedAmount": "₹<Amount>",
//                           "AvailableFundsConsideration": "Based on your current funds and cash flow, <Amount> is set aside without impacting other financial goals."
//                         },
//                         "Advice": {
//                           "DebtStrategy": "<Debt-related advice based on debt type, interest rates, etc.>",
//                           "Priority": "<Prioritize high-interest debts first, or allocate according to long-term goals.>"
//                           }
//                       },
//                     "GoalRoadmap": {
//                         "ShortTermGoal": {
//                             "Description": "<Goal Description>",
//                             "TargetAmount": "₹<Target Amount>",
//                             "MonthlySavingsNeeded": "₹<Monthly Savings>",
//                             "Advice": "<Short-term goal advice>"
//                         },
//                         "LongTermGoal": {
//                             "Description": "<Goal Description>",
//                             "CurrentAge": "<Current Age>",
//                             "YearsToInvest": "<Years to Invest (Add if requried)>",
//                             "EstimatedAnnualRequirement": "₹<Estimated Annual Requirement>",
//                             "Advice": "<Long-term goal advice>"
//                         }
//                     },
//                     "StructuredPlan": {
//                         "Step1": "<Step 1 in the savings/investment plan>",
//                         "Step2": "<Step 2>",
//                         "Step3": "<Step 3>"
//                         <If needed add more steps>
//                     },
//                     "Growth": {
//                         "OverallCurrentGrowthPercentage": "<Provide a single percentage value, e.g., 10%>",
//                         "PotentialGrowthPercentage": "<Provide a single percentage value, e.g., 15% or 20%>"
//                     },
//                     "Summary": "<Summary advice tailored to the user's financial situation and goals>"
//                 }

//                 `,
//             },
//             {
//                 role: "user",
//                 content: `
//                   Location: ${country}
//                   Occupation: ${occupation}
//                   Age: ${age}
//                   In-Hand Salary: ${monthly_salary}
//                   Monthly Expenses: ₹${total_expenses}
//                   Total Investments: ₹${total_investment}
//                   Short-term goal: ${short_term_goal} (e.g., travel, purchasing a phone, etc.)
//                   Long-term goal: ${long_term_goal} (e.g., wealth building, retirement fund, etc.)
//                   Risk tolerance: ${risk_tolerance} (e.g., low, medium, high)
//                   Monthly-Debt: ₹${debt} (Specify debt type: student loan, credit card, etc. with duration.)
//                 `,
//             },
//         ],
//         response_format: zodResponseFormat(UserResponse, "UserResponse"),
//         temperature: 0.7,
//     });
    
//     return {
//         result: completion,
//         response: completion.choices[0].message.parsed,
//     }
// }
