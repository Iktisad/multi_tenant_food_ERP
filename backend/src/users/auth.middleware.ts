import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Extend Express Request type to include `user`
export interface AuthRequest extends Request {
    user?: { id: string; tenantId: string; role: string };
}

export class AuthMiddleware {
    static authenticate(req: AuthRequest, res: Response, next: NextFunction): void{
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                res.status(401).json({ error: 'Unauthorized access' });
                return;
            }

            const decoded = jwt.verify(token, SECRET_KEY) as AuthRequest['user'];
            req.user = decoded;

            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
}
