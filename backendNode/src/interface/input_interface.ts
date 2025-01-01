import { RiskTolerance } from "./enum";

export interface UserCreation {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserInput {
    country: string;
    age: number;
    occupation: string;
    monthly_income: number;
    monthly_expense: number;
    monthly_debt?: number;
    total_remaining_debt?: number;
    risk_tolerance: string;
    goal_priorities: string;
    current_amount_savings: string;
    short_term: string;
    long_term: string;
}


export interface UserOutput {
    expenseAnalysis: ExpenseAnalysis;
    investmentAdvice: InvestmentAdvice;
    savingPlan: SavingPlan;
    debtManagement: DebtManagement;
    goalRoadmap: GoalRoadmap;
    structuredPlan: StructuredPlan;
    growth: Growth;
    summary: string;
}

export interface ExpenseAnalysis {
    MonhtlyEarning: number;
    TotalInvestedAmount: number;
    MonthlyExpenses: number;
    MonthlyDebt: number;
    MoneySaved: number;
    Advice: string;
}

export interface InvestmentAdvice {
    WhereToInvest: WhereToInvest;
}

export interface WhereToInvest {
    Allocation1: InvestmentOption;
    Allocation2?: InvestmentOption;
    Allocation3?: InvestmentOption;
    Allocation4?: InvestmentOption;
    Allocation5?: InvestmentOption;
    Allocation6?: InvestmentOption;
    Allocation7?: InvestmentOption;
    Allocation8?: InvestmentOption;
    GoalAlignment: string;
    StrategyRationale: string;
    DiversificationStrategy: string;
    Advice: string;
}

export interface InvestmentOption {
    Name: string;
    PercentageAllocation: string;
    Amount: number;
    AssetClass: string;
}

export interface SavingPlan {
    TotalMonthlySaving: number;
    AnnualSaving: number;
    PercentageOfSalarySaved: string;
    Advice: string;
}

export interface DebtManagement {
    TotalDebt: number;
    MoneyToSetAside: {
        TimePeriod: string;
        SuggestedAmount: number;
        AvailableFundsConsideration: string | number
    }
    Advice: {
        DebtStrategy: string;
        Priority: string;
    };
}

export interface GoalRoadmap {
    ShortTermGoal: ShortGoal;
    LongTermGoal: LongGoal;
}

export interface ShortGoal {
    Description: string;
    TargetAmount: number;
    MonthlySavingsNeeded: number;
    Advice: string;
}

export interface LongGoal {
    Description: string;
    CurrentAge: number;
    YearsToInvest: number | undefined;
    EstimatedAnnualRequirement: number;
    Advice: string;
}

export interface StructuredPlan {
    Step1?: string;
    Step2?: string;
    Step3?: string;
    Step4?: string;
    Step5?: string;
    Step6?: string;
    Step7?: string;
}

export interface Growth {
    OverallCurrentGrowthPercentage: string;
    PotentialGrowthPercentage: string;
}

export interface Location {
    country: string;
}

export interface Account {
    age: number;
    occupation: string;
    monthly_income: number;
    monthly_expense: number;
    monthly_debt?: number
    total_remaining_debt?: number;
    risk_tolerance: RiskTolerance;
    goal_priorities: string;
    current_amount_savings?: string;
    short_term: string;
    long_term: string;

}

export interface TermsAndCondition {
    acceptTerms: boolean;
}