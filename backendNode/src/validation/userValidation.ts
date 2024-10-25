import z from 'zod'

export const credentialUserRegistration = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Must be a valid email address' }),
    password: z.string().min(6, { message: 'Password is required and should be at least 6 characters long' }),
})