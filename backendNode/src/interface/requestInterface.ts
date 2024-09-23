import { Request } from "express";

export interface NewRequest extends Request {
    user?: {
        provider?: string;
        token?: {
            sub: string;
            email: string;
            name: string;
            password: string;
            picture: string
        }
    };
}