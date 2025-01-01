import express from 'express';
import {
    testRouter,
    handleGoogleUserAuth,
    registerCredentialUser,
    handleCredentialUserAuth,
    getUserFinancialReport,
    checkFinancialReport,
} from '../controller/user_controller';
import { authenticateUser, rateLimiter } from './middleware';

const user_router = express.Router();

// GET
user_router.get('/', testRouter)
user_router.get('/financialReport/:id', rateLimiter(5,1), getUserFinancialReport)
user_router.get('/checkFinancialReport/:email', rateLimiter(3,1), checkFinancialReport)

// POST 
user_router.post('/session', rateLimiter(2,1), authenticateUser, handleGoogleUserAuth)
user_router.post('/userCreate', rateLimiter(1,1), registerCredentialUser)
user_router.post('/credentials', rateLimiter(3, 1), handleCredentialUserAuth)


export default user_router;