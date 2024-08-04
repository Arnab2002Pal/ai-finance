import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


interface NewRequest extends Request {
    user?: string | JwtPayload;
    provider?: string;  
}

export const authenticateUser = async (req: NewRequest, res: Response, next: NextFunction) => {
    const authHeader = req.body.userData;

    if (!authHeader) {
        return res.sendStatus(401)
    }
    const token = authHeader.token.split(' ')[1];

    try {
        const decoded = jwt.decode(token);

        if (!decoded) {
            return res.sendStatus(403);
        }
        req.user = {
            token: decoded,
            provider: authHeader.provider
        }
        next();
    } catch (error) {
        res.sendStatus(403);
    }
};
