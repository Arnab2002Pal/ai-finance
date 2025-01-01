import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'
import { schema } from './response_formatter';
import { systemInstruction } from '../utils/prompt';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemInstruction,
});

const generationConfig = {
    temperature: 1,
    maxOutputTokens: 3000,
    responseMimeType: "application/json",
    responseSchema: schema
};

export async function generateResult(input: any) {
    console.log("[Gemini] Started Processing");
    
    const chatSession = model.startChat({
        generationConfig
    });
    
    const result = await chatSession.sendMessage(input);
    console.log("[Gemini] Processing Complete");
    const response = JSON.parse(result.response.text())
    return response;
}
