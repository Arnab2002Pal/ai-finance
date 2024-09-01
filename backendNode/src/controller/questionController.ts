// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const addQuestion = async (req: Request, res: Response) => {
//     const questions = [
//         { question: 'Question 1' },
//         { question: 'Question 2' },
//         { question: 'Question 3' },
//     ];
//     console.log("Inside-------1");
    
//     const questionAdded = await prisma.question.createMany({
//         data: questions,
//     })
    
//     console.log("Inside-------1");
//     res.json({
//         success: true,
//         message: 'Questions added successfully',
//         data: questionAdded
//     });
// }