import { z } from 'zod';

export const signUpValidationSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: "Must be a valid email address" }),
    password: z.string().min(6, { message: 'Password is required and should be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
})

export interface SignUpValidationSchema extends z.infer<typeof signUpValidationSchema> { }

export const signInValidationScema = z.object({
    email: z.string().email({ message: "Must be a valid email address" }),
    password: z.string().min(6, { message: 'Password is required and should be at least 6 characters long' }),
})

export interface SignInValidationSchema extends z.infer<typeof signInValidationScema> { }
