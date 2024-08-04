import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {userRouter} from './router/userRouter'

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors()); 

app.use('/api/v1', userRouter)


// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
