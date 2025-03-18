import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IUser } from '../users/user.model';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export class TokenManager {
    static generateToken(user: IUser): string {
        return jwt.sign(
            { id: user._id, tenantId: user.tenantId, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );
    }

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
