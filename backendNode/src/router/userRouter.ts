import express from 'express';
import {
    handleGoogleUserAuth,
    handleCredentialUserAuth,
    createAndUpdateUserInfo,
    getUserInfo
} from '../controller/userController';
import { authenticateUser } from './middleware';

const userRouter = express.Router();

// GET
userRouter.get('/userInfo/:id', getUserInfo)

// POST 
userRouter.post('/session', authenticateUser, handleGoogleUserAuth)
userRouter.post('/credentials', handleCredentialUserAuth)
userRouter.post('/userInfo', createAndUpdateUserInfo)


export { userRouter };
