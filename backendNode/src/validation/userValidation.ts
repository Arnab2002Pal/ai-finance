import z from 'zod'
import { RiskTolerance } from '../interface/enum'

export const credentialUserRegistration = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Must be a valid email address' }),
    password: z.string().min(6, { message: 'Password is required and should be at least 6 characters long' }),
})

export const inputValidations = z.object({
    email: z.string().email({ message: 'Email Required' }),
    locationInfo: z.object({
        country: z.string().min(1, { message: 'Country is required' }),
    }),
    accountInfo: z.object({
        age: z.number().int({ message: 'Age must be a whole number' }),
        occupation: z.string().min(1, { message: 'Occupation is required' }),
        monthly_income: z.number().int({ message: 'Monthly income must be a whole number' }),
        monthly_expense: z.number().int({ message: 'Monthly expense must be a whole number' }),
        monthly_debt: z.number().int({ message: 'Monthly debt must be a whole number' }),
        total_remaining_debt: z.number().int({ message: 'Total remaining debt must be a whole number' }),
        risk_tolerance: z.enum([RiskTolerance.Aggressive, RiskTolerance.Conservative, RiskTolerance.Moderate]),
        goal_priorities: z.string({ message: "Required" }),
        current_amount_savings: z.string(),
        short_term: z.string(),
        long_term: z.string(),
    }),
    termsAndCondition: z.object({
        acceptTerms: z.boolean({ message: 'You must agree to the terms and conditions' }),
    }),
})