import express from 'express';
import {
    testRouter,
    handleGoogleUserAuth,
    registerCredentialUser,
    handleCredentialUserAuth,
    generateAdvice,
    getUserInfo,
    checkFinancialReport
} from '../controller/userController';
import { authenticateUser } from './middleware';

const userRouter = express.Router();

// GET
userRouter.get('/', testRouter)
userRouter.get('/userInfo/:id', getUserInfo)
userRouter.get('/checkFinancialReport/:email', checkFinancialReport)

// POST 
userRouter.post('/session', authenticateUser, handleGoogleUserAuth)
userRouter.post('/userCreate', registerCredentialUser)
userRouter.post('/credentials', handleCredentialUserAuth)
userRouter.post('/generateAdvice', generateAdvice)


export { userRouter };
