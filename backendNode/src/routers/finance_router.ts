import express from 'express';
import { generateAdvice } from '../controller/finance_controller';
import { rateLimiter } from './middleware';

const financial_router = express.Router();

// POST
financial_router.post('/generateAdvice',  rateLimiter(1,30),generateAdvice)

export default financial_router;