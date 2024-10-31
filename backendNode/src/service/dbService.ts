import { PrismaClient } from '@prisma/client';
import { Account, Location, TermsAndCondition } from '../interface/inputInterface';
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient();

export const hashPassword = async (password: string): Promise<string> => {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}

export const updateUserFlag = async(userId: number, user_active: boolean) => {
    return prisma.user.update({
        where: { id: userId },
        data: { first_timer: user_active },
    })
}

export const updateOrCreateLocationInfo = async (userId: number, locationInfo: Location) => {

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

