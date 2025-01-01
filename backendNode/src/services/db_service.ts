import { PrismaClient } from '@prisma/client';
import { Account, Location, TermsAndCondition } from '../interface/input_interface';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};

export const updateUserFlag = async (userId: number, userActive: boolean) => {
    return prisma.user.update({
        where: { id: userId },
        data: { first_timer: userActive },
    });
};

export const updateOrCreateLocationInfo = async (userId: number, locationInfo: Location) => {
    return prisma.locationInfo.upsert({
        where: { user_id: userId },
        update: { location: locationInfo.country },
        create: { user_id: userId, location: locationInfo.country },
    });
};

export const updateOrCreateAccountInfo = async (userId: number, accountInfo: Account) => {
    const accountData = {
        age: accountInfo.age,
        occupation: accountInfo.occupation,
        monthly_income: accountInfo.monthly_income,
        monthly_expense: accountInfo.monthly_expense,
        monthly_debt: accountInfo.monthly_debt,
        total_remaining_debt: accountInfo.total_remaining_debt,
        goal_priorities: accountInfo.goal_priorities,
        risk_tolerance: accountInfo.risk_tolerance,
        current_amount_savings: accountInfo.current_amount_savings,
        short_term: accountInfo.short_term,
        long_term: accountInfo.long_term,
    };

    return prisma.accountInfo.upsert({
        where: { user_id: userId },
        update: accountData,
        create: { user_id: userId, ...accountData },
    });
};

export const updateOrCreateTermsAndCondition = async (userId: number, termsAndCondition: TermsAndCondition) => {
    return prisma.termsAndCondition.upsert({
        where: { user_id: userId },
        update: { acceptTerms: termsAndCondition.acceptTerms },
        create: { user_id: userId, acceptTerms: termsAndCondition.acceptTerms },
    });
};
