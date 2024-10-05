import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {userRouter} from './router/userRouter'
import questionRouter  from './router/questionRouter'

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 

app.use('/api/v1', userRouter)
app.use('/api/v1/question', questionRouter)

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
