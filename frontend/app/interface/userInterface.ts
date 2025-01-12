export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface FormData {
    email: string;
    locationInfo: LocationInfo;
    accountInfo: UserAccountInfo;
    termsAndCondition: TermsAndCondition;
}

export interface LocationInfo {
    country: string;
}

export interface UserAccountInfo {
    age: number;
    occupation: string,
    monthly_income: number,
    monthly_expense: number,
    monthly_debt?: number,
    total_remaining_debt?: number,
    risk_tolerance: RiskTolerance,
    goal_priorities: string,
    current_amount_savings?: string,
    short_term: string,
    long_term: string,
}

export interface TermsAndCondition {
    acceptTerms: boolean;
}

export enum RiskTolerance {
    default = "",
    Conservative = "Conservative",
    Moderate = "Moderate",
    Aggressive = "Aggressive",
}

export interface UserInfo {
    user_id?: number;
    name: string;
    email: string;
    profile_image?: string;
}

export interface UserData {
    success?: boolean;
    userFinancialInfo?: UserFinancialInfo;
}

export interface UserFinancialInfo {
    expenseAnalysis: ExpenseAnalysis;
    investmentAdvice: InvestmentAdvice;
    savingPlan: SavingPlan;
    debtManagement?: DebtManagement;
    goalRoadmap: GoalRoadmap;
    structuredPlan: string[];
    growthAnalysis: Growth;
    reEvaluation: reEvaluation;
    summary: Summary;
}

export interface ExpenseAnalysis {
    monthlyExpenses: number,
    monthlyNetEarnings: number,
    monthlyDebtPayments: number,
    totalCurrentSavings: number,
    totalMonthlySavings: number
    advice: string;
}

export interface InvestmentAdvice {
    riskTolerance: RiskTolerance,
    investments: InvestmentGroup[]
}

export interface InvestmentGroup {
    assetClass: string;
    investmentName: string;
    amountAllocated: number;
    percentageAllocation: number;
}

export interface SavingPlan {
    annualSavings: number,
    totalMonthlySavings: number,
    percentageOfSalarySaved: number,
    advice: string;
}

export interface DebtManagement {
    totalExistingDebt: number,
    recommendedDebtPayment: number,
    advice: string;
}

export interface GoalRoadmap {
    longTermGoals: string;
    shortTermGoals: string;
    advice: string;
}

export interface Growth {
    currentGrowthPercentage: number;
    potentialGrowthPercentage: number;
}

export interface reEvaluation {
    timeframe: string
}

export interface Summary {
    nextSteps: string,
    currentSituation: string,
    expectedOutcomes: string,
    keyRecommendations: string,
    reEvaluationTimeframe: number
}