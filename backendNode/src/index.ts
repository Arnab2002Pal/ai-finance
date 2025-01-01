import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import user_router from './routers/user_router';
import financial_router from './routers/finance_router';
import { redis } from './configs/redis';

dotenv.config();

const app = express();
redis.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: [`${process.env.FRONTEND_URL_LOCAL}`, `${process.env.FRONTEND_URL_PRODUCTION}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true,
}));

app.use('/api/v1/user', user_router)
app.use('/api/v1/finance', financial_router)

// Start server
const port = process.env.PORT!
const mode = process.env.NODE_ENV?.trim().toUpperCase()

const mode_port = process.env.NODE_ENV?.trim().toUpperCase() === 'PROD' ? port: 3001

app.listen(mode_port, () => {
    console.log(`[Server] Started in ${mode} mode on port: ${mode_port}`);
});
