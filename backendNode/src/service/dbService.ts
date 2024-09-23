import { PrismaClient } from '@prisma/client';
import { Account, Location, TermsAndCondition } from '../interface/inputInterface';

export const updateOrCreateLocationInfo = async (userId: number, locationInfo: Location) => {
    const prisma = new PrismaClient();

    return prisma.locationInfo.upsert({
        where: { user_id: userId },
        update: { location: locationInfo.location },
        create: { user_id: userId, location: locationInfo.location },
    });
};

export const updateOrCreateAccountInfo = async (userId: number, accountInfo: Account) => {
    const prisma = new PrismaClient();
    
    return prisma.accountInfo.upsert({
        where: { user_id: userId },
        update: {
            age: Number(accountInfo.age),
            occupation: accountInfo.occupation,
            monthlyIncome: Number(accountInfo.monthlyIncome),
            totalExpense: accountInfo.totalExpense,
            totalInvestment: Number
            (accountInfo.currentInvestment),
            shortTermGoal: accountInfo.shortTermGoal,
            longTermGoal: accountInfo.longTermGoal,
            riskTolerance: accountInfo.riskTolerance,
            debt: accountInfo.debt,
        },
        create: {
            user_id: userId,
            occupation: accountInfo.occupation,
            age: Number(accountInfo.age),
            monthlyIncome: Number(accountInfo.monthlyIncome),
            totalExpense: accountInfo.totalExpense,
            totalInvestment: Number(accountInfo.currentInvestment),
            shortTermGoal: accountInfo.shortTermGoal,
            longTermGoal: accountInfo.longTermGoal,
            riskTolerance: accountInfo.riskTolerance,
            debt: accountInfo.debt,
        },
    });
};


export const updateOrCreateTermsAndCondition = async (userId: number, termsAndCondition: TermsAndCondition) => {
    const prisma = new PrismaClient();

    return prisma.termsAndCondition.upsert({
        where: { user_id: userId },
        update: { acceptTerms: termsAndCondition.acceptTerms },
        create: { user_id: userId, acceptTerms: termsAndCondition.acceptTerms },
    });
}

