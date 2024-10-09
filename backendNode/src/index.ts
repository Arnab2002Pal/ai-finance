import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {userRouter} from './router/userRouter'
import questionRouter  from './router/questionRouter'
import { gptCall } from './service/openai';

const gptInput: any = {
    country: "India",
    age:  22,
    occupation:"Software Engineer",
    monthly_salary: 50000,
    total_expenses:35000,
    total_investment: 150000,
    short_term_goal:"Buy Phone",
    long_term_goal:  "Buy House",
    debt: "3000/m for 3 months",
    risk_tolerance: "High",
};

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 

app.use('/api/v1', userRouter)
app.use('/api/v1/question', questionRouter)
gptCall(gptInput)
// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
