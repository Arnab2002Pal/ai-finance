import { Request } from "express";
import { JwtPayload } from 'jsonwebtoken';

export interface JwtRequest extends Request {
    user?: string | JwtPayload;
    provider?: string;  
}

export interface NewRequest extends Request {
    user?: {
        provider: string;
        token: {
            sub: string;
            email: string;
            name: string;
            password: string;
            picture: string
        }
    };
}