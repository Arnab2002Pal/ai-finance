import express from 'express';
import { googleUserToken, credentialUser } from '../controller/userController';
import { authenticateUser } from './middleware';
const userRouter = express.Router();

// userRouter.get('/',test)
userRouter.post('/session', authenticateUser, googleUserToken)
userRouter.post('/credentials', credentialUser)

export { userRouter };
