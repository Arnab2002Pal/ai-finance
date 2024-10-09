import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { UserResponse } from "./responseFormatter";
import { UserInput } from "../interface/inputInterface";
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
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
    risk_tolerance,
}: UserInput) {
    console.log("---------GPT call initiated---------");

    // const completion = await client.beta.chat.completions.parse({
    //     model: "gpt-4o-mini",
    //     messages: [
    //         {
    //             role: "system",
    //             content: `
    //             Role: Financial Advisor
    //             Task: You will be given set of user data. Based on the input, analyze and provide financial report based on there risk tolerance. This will give user a detailed report on how to invest, where to invest, how much to invest, and more.

    //             - Expense Analysis: Provide the following: Monthly Earning, Total Invested Amount, Monthly Expense(exclude monthly debt), Monthly debt(exclude monthly expense), Total remaining money saved, Advice.
    //             - Investment Advice: Provide the following:
    //                 - Where to invest: Diversify and allocate the saved money to different investments across different assest class. Diversification strategy should be based on the user's risk tolerance and should be made after analyzing the user's savings only. Make sure calculate amount accurately according to the percentage and should not exceed the total amount saved.
    //                 - Include Name of the investment and asset class, percentage allocation, and amount.
    //             - Saving Plan: Provide the following: Total Monthly Saving, Annual Saving, Percentage of salary saved. Include advice which explains on how to save more and in efficient way.
    //             - Debt Management: Provide the following: Total Debt, Money to Set Aside, Advice
    //             - Goal Roadmap: Provide the following: Short Term Goal, Long Term Goal based on investment made. Include advice on how to achieve the goal.
    //             - Structured Plan: Provide the following: Step 1, Step 2, Step 3 and so on if necessary
    //             - Growth: Provide the following:
    //                 - Overall Current Growth Percentage: Calculate the current growth in percentage based on the user's report.
    //                 - Potential Growth Percentage: Estimate the potential growth in percentage after following the given investment and savings structure
    //             - Summary: Provide a summary of the report tailored to the user's financial situation and goals.


    //             - The output must follow this exact structure, without omissions or changes.
    //             - Return the output in JSON format.
    //             - If any field is empty declare it with emplty string.
    //             - Ensure the output follows the below structure, and create a well-structured accordingly.

    //             Structure:
    //             {
    //                 "ExpenseAnalysis": {
    //                     "MonhtlyEarning": "<Total Earning>",
    //                     "TotalInvestedAmount": "<Total Invested>",
    //                     "MonthlyExpenses": "<Total Expenses>",
    //                     "MonthlyDebt": "<Total Debt>",
    //                     "MoneySaved": "<Total Remaining Money Saved>",
    //                     "Advice": "<Expense-related advice>"
    //                 },
    //                 "InvestmentAdvice": {
    //                     "WhereToInvest": {
    //                         "Allocation1": {
    //                             "Name": "<Investment Option 1>",
    //                             "PercentageAllocation": "<Percentage Allocation>"
    //                             "Amount": "₹<Amount>",
    //                             "AssetClass": "Specify the asset class, e.g., real estate, bonds, gold, cryptocurrencies, or any other alternative investment type."
    //                         },
    //                         "Allocation2": {
    //                             "Name": "<Investment Option 2>",
    //                             "PercentageAllocation": "<Percentage Allocation>"
    //                             "Amount": "₹<Amount>",
    //                             "AssetClass": "<Asset Class>"
    //                         },
    //                         <Add more allocation as per requirement.>

    //                         "GoalAlignment": "<Investment rationale for short-term and long-term goals>",
    //                         "StrategyRationale": "<Why this investment strategy>",
    //                         "DiversificationStrategy": "<Diversification strategy>",
    //                         "Advice": "<Personalized investment advice>"
    //                 },
    //                 "SavingPlan": {
    //                     "TotalMonthlySaving": "₹<Total Monthly Saving>",
    //                     "AnnualSaving": "₹<Annual Saving>",
    //                     "PercentageOfSalarySaved": "<Percentage of Salary Saved>",
    //                     "Advice": "<Saving-related advice>"
    //                 },
    //                 "DebtManagement": {
    //                     "TotalDebt": "₹<Total Debt>",
    //                     "MoneyToSetAside": {
    //                         "Time Period": "<For how long>"
    //                       "SuggestedAmount": "₹<Amount>",
    //                       "AvailableFundsConsideration": "Based on your current funds and cash flow, <Amount> is set aside without impacting other financial goals."
    //                     },
    //                     "Advice": {
    //                       "DebtStrategy": "<Debt-related advice based on debt type, interest rates, etc.>",
    //                       "Priority": "<Prioritize high-interest debts first, or allocate according to long-term goals.>"
    //                       }
    //                   },
    //                 "GoalRoadmap": {
    //                     "ShortTermGoal": {
    //                         "Description": "<Goal Description>",
    //                         "TargetAmount": "₹<Target Amount>",
    //                         "MonthlySavingsNeeded": "₹<Monthly Savings>",
    //                         "Advice": "<Short-term goal advice>"
    //                     },
    //                     "LongTermGoal": {
    //                         "Description": "<Goal Description>",
    //                         "CurrentAge": "<Current Age>",
    //                         "YearsToInvest": "<Years to Invest (Add if requried)>",
    //                         "EstimatedAnnualRequirement": "₹<Estimated Annual Requirement>",
    //                         "Advice": "<Long-term goal advice>"
    //                     }
    //                 },
    //                 "StructuredPlan": {
    //                     "Step1": "<Step 1 in the savings/investment plan>",
    //                     "Step2": "<Step 2>",
    //                     "Step3": "<Step 3>"
    //                     <If needed add more steps>
    //                 },
    //                 "Growth": {
    //                     "OverallCurrentGrowthPercentage": "<Provide a single percentage value, e.g., 10%>",
    //                     "PotentialGrowthPercentage": "<Provide a single percentage value, e.g., 15% or 20%>"
    //                 },
    //                 "Summary": "<Summary advice tailored to the user's financial situation and goals>"
    //             }

    //             `,
    //         },
    //         {
    //             role: "user",
    //             content: `
    //               Location: ${country}
    //               Occupation: ${occupation}
    //               Age: ${age}
    //               In-Hand Salary: ${monthly_salary}
    //               Monthly Expenses: ₹${total_expenses}
    //               Total Investments: ₹${total_investment}
    //               Short-term goal: ${short_term_goal} (e.g., travel, purchasing a phone, etc.)
    //               Long-term goal: ${long_term_goal} (e.g., wealth building, retirement fund, etc.)
    //               Risk tolerance: ${risk_tolerance} (e.g., low, medium, high)
    //               Monthly-Debt: ₹${debt} (Specify debt type: student loan, credit card, etc. with duration.)
    //             `,
    //         },
    //     ],
    //     response_format: zodResponseFormat(UserResponse, "UserResponse"),
    //     temperature: 0.7,
    // });

    const expenseCompletion = await client.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `
                You are an expert financial adviser. Based on the data, follow the following steps:
                - Analyses the data
                    - create an expense analysis with current data
                    - create an optimised expense analysis focusing on
	                    1. reduce expense if possible
	                    2. create a plan and focus on emergency fund first but if there is optional in priority then focus on that.
	                    3. once emergency fund is saved after that only create a plan for saving and investment simultaneously if possible otherwise keep it seperate one after the another.
	                    

                - Initial Focus on Emergency Fund: Build a small emergency fund first.
                - Pay Down High-Interest Debt: Prioritize paying down  debt while making minimum payments on others.
                - Balance Savings and Investments: Once debt is under control, focus on savings and investments simultaneously.
                `
            },
            {
                role: "user",
                content: `
                    Location: India
                    Age: 22
                    Occupation: Software Developer
                    In-Hand Monthly Salary: 26000
                    Total Invested Amount: 40000
                    Goals:
                    - Short-Term: Buy bike for 2 lakh within 1 year
                    - Long-Term: Create Wealth by age 40 
                    Risk Tolerance: Medium 
                    Expenses:
                        - Monthly Fixed Expenses:  14000
                        - Monthly Variable Expenses: 6000
                        - Debt: ₹5,000 per month for 4 months
                        - Debt Repaid: 3 EMI
                   Current Savings:
                        - Total Savings:  0
                        - Savings Duration:  NA
                  Emergency Fund:
                        - Total Fund Saved:  0
                        - Fund saving Duration:  NA
                Optional(includes instruction if something is at priority): null
                `,
            }
        ],
        // response_format: zodResponseFormat(UserResponse, "UserResponse"),

    })
    console.log("Response:------------- ", expenseCompletion.choices[0].message);

    return {
        // result: completion,
        // response: completion.choices[0].message.parsed,
    }
}



                //   Location: ${country} || India
                //     Age: ${age} || 22
                //     Occupation: ${occupation} || Software Developer
                //     In-Hand Monthly Salary: ₹${monthly_salary} || 26000
                //     Total Investments: ₹${total_investment} || 40000
                //     Goals:
                //     - Short-Term: ${short_term_goal} 
                //     - Long-Term: ${long_term_goal} 
                //     Risk Tolerance: ${risk_tolerance} 
                //     Expenses:
                //         - Monthly Fixed Expenses: ₹${fixed_expenses} || 14000
                //         - Monthly Variable Expenses: ₹${variable_expenses} || 6000
                //         - Debt: ₹5,000 per month for 15 months
                //         - Debt Repaid: 3 months
                //    Current Savings:
                //         - Total Savings: ₹${total_savings} || 0
                //         - Savings Duration: ${savings_duration} months || nil
                //   Emergency Fund:
                //         - Total Fund Saved: ₹${emergency_fund_saved} || 0
                //         - Fund saving Duration: ${emergency_fund_duration} months || 0
                // Optional(includes instruction if something is at priority): ${optional_instruction} || null