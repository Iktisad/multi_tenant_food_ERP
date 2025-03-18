import User, { IUser } from './user.model';
import { TokenManager } from '../utils/token.manager';

export interface IAuthService {
    register(userDoc:IUser): Promise<IUser>;
    login(email: string, password: string): Promise<{ token: string; user: IUser }>;
}

export class AuthService {
    async register(userDoc: IUser): Promise<IUser> {
        const { name, email, password, role, tenantId } = userDoc;
        if (await User.findOne({ email })) throw new Error('Email already in use');

        const hashedPassword = await TokenManager.hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword, role, tenantId });
        return await newUser.save();
    }

    async login(email: string, password: string): Promise<{ token: string; user: IUser }> {
        const user = await User.findOne({ email });
        if (!user || !(await TokenManager.verifyPassword(password, user.password)))
            throw new Error('Invalid email or password');

        return { token: TokenManager.generateToken(user), user };
    }
}
