import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from "bcrypt-ts";
import { gptCall } from '../service/gpt';
import { InvestmentAdvice, UserInput } from '../interface/inputInterface';
import { responseCleanUp } from '../service/responseFormatter';
import { updateOrCreateAccountInfo, updateOrCreateLocationInfo, updateOrCreateTermsAndCondition } from '../service/dbService';
import { generateFinancialAdvice } from '../service/gptService';

// TODO: create a user sign in page

const prisma = new PrismaClient();

interface NewRequest extends Request {
    user?: {
        provider?: string;
        token?: {
            sub: string;
            email: string;
            name: string;
            password: string;
            picture: string
        }
    };
}

export const googleUserToken = async (req: NewRequest, res: Response) => {
    const { user } = req;

    if (!user || !user.provider || !user.token) {
        return res.status(400).json({
            success: false,
            message: 'Invalid user data'
        });
    }

    const userData = {
        provider: user.provider,
        name: user.token.name,
        email: user.token.email,
        password: user.provider === 'google' ? '' : '',
        profile_image: user.token.picture
    };

    try {
        const userExist = await prisma.user.findUnique({
            where: { email: user.token.email }
        })

        if (userExist) {            
            return res.status(200).json({
                success: true,
                message: 'User already exists',
                data: userExist
            })
        }

        const result = await prisma.user.upsert({
            where: { email: user.token.email },
            update: { ...userData },
            create: { ...userData, password: '' }
        });

        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating/updating the user'
        });
    }
};



export const credentialUser = async (req: Request, res: Response) => {
    // implement user creation logic for credentials provider
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {            
            return res.status(404).json({
                message: 'User not found'
            })
        }
        
        return res.status(200).json({
            success: true,
            userData: {
                id: user.id,
                email: user.email,
                name: user.name,
                profile_image: user.profile_image
            }

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating/updating the user'
        });
    }

} 


export const userInfo = async (req: Request, res: Response) => {
    const { email, locationInfo, accountInfo, termsAndCondition } = req.body;
    
    const gptInput: UserInput = {
        country: locationInfo.location,
        age: Number(locationInfo.age) || 22,
        occupation: accountInfo.occupation,
        monthly_salary: Number(accountInfo.monthlyIncome),
        total_expenses: accountInfo.totalExpense,
        total_investment: accountInfo.currentInvestment,
        short_term_goal: accountInfo.shortTermGoal,
        long_term_goal: accountInfo.longTermGoal,
        debt: accountInfo.debt,
        risk_tolerance: accountInfo.riskTolerance 
    }    

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        await updateOrCreateLocationInfo(user.id, locationInfo)
        await updateOrCreateAccountInfo(user.id, accountInfo)
        await updateOrCreateTermsAndCondition(user.id, termsAndCondition)

        // Update or create the related locationInfo
        // await prisma.locationInfo.upsert({
        //     where: { user_id: user.id },
        //     update: {
        //         location: locationInfo.location,
        //     },
        //     create: {
        //         user_id: user.id,
        //         location: locationInfo.location,
        //     },
        // });

        // Update or create the related accountInfo
        // await prisma.accountInfo.upsert({
        //     where: { user_id: user.id },
        //     update: {
        //         occupation: accountInfo.occupation,
        //         age: Number(accountInfo.age) || 22,
        //         monthlyIncome: Number(accountInfo.monthlyIncome),
        //         totalExpense: accountInfo.totalExpense, 
        //         currentInvestment: accountInfo.currentInvestment,
        //         shortTermGoal: accountInfo.shortTermGoal,
        //         longTermGoal: accountInfo.longTermGoal,
        //         riskTolerance: accountInfo.riskTolerance,
        //         debt: accountInfo.debt,
        //     },
        //     create: {
        //         user_id: user.id,
        //         occupation: accountInfo.occupation,
        //         age: Number(accountInfo.age) || 22,
        //         monthlyIncome: Number(accountInfo.monthlyIncome),
        //         totalExpense: accountInfo.totalExpense,
        //         currentInvestment: accountInfo.currentInvestment,
        //         shortTermGoal: accountInfo.shortTermGoal,
        //         longTermGoal: accountInfo.longTermGoal,
        //         riskTolerance: accountInfo.riskTolerance,
        //         debt: accountInfo.debt,
        //     },
        // });

        // Update or create the related termsAndCondition
        // await prisma.termsAndCondition.upsert({
        //     where: { user_id: user.id },
        //     update: {
        //         acceptTerms: termsAndCondition.acceptTerms,
        //     },
        //     create: {
        //         user_id: user.id,
        //         acceptTerms: termsAndCondition.acceptTerms,
        //     },
        // });
        
        const gptResponse = await generateFinancialAdvice(gptInput)

        await prisma.financialAdvice.upsert({
            where: { user_id: user.id },
            update: gptResponse,
            create: { user_id: user.id, ...gptResponse },
        });

        console.log(gptResponse.structuredPlan);
        
                
        res.status(201).json({
            success: true,
            message: 'User information created or updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating or updating user information',
        });
    }
};
