import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { JwtRequest } from '../interface/request_interface';

export const authenticateUser = async (req: JwtRequest, res: Response, next: NextFunction) => {
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

/**
 * A middleware function to limit the number of requests made to an Express route.
 * It uses the express-rate-limit package to enforce a rate limit based on the provided parameters.
 *
 * @param maxRequest - The maximum number of requests allowed within the specified windowMs time.
 * @param duration - The time window in minutes for which the maxRequest limit applies.
 *
 * @returns An Express middleware function that limits the number of requests.
 *          If the request limit is exceeded, it sends a 429 status code with the specified message.
 */
export const rateLimiter = (maxRequest: number, duration: number) => {
    return rateLimit({
        windowMs: duration * 60 * 1000, // duration mins in milliseconds
        max: maxRequest,
        message: `You have exceeded the ${maxRequest} requests in ${duration} Mins limit!`,
        standardHeaders: true,
        legacyHeaders: false,
    });
}

