import User, { IUser } from './user.model';
import { TokenManager } from '../utils/token.manager';
import Tenant from '../tenant/tenant.model';

export interface IAuthService {
    register(userDoc:IUser): Promise<IUser>;
    login(email: string, password: string): Promise<{ token: string; user: IUser }>;
}
interface IUserDocument {
    name: string;
    email: string;
    password: string;
    businessName: string;
 }
export class AuthService {
    async register(userDoc: IUserDocument): Promise<IUser> {
        const { name, email, password, businessName } = userDoc;
        if (await User.findOne({ email })) throw new Error('Email already in use');


        // Check if business exists
        let tenant = await Tenant.findOne({ name: businessName });

        // If business doesn't exist, create a new Tenant
        if (!tenant) {
            tenant = new Tenant({ name: businessName });
            await tenant.save();
            console.log(`🆕 Created new tenant: ${businessName} (ID: ${tenant.tenantId})`);
        }
        // Determine role: First user is Admin, others are Staff
        const existingTenantAdmin = await User.findOne({ tenantId: tenant.tenantId, role: "Admin" });
        const role = existingTenantAdmin ? "Staff" : "Admin";

        // Create new user
        const hashedPassword = await TokenManager.hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            tenantId: tenant.tenantId
        });

        return await newUser.save();
    }

    async login(email: string, password: string): Promise<{ token: string; user: IUser }> {
        const user = await User.findOne({ email });
        if (!user || !(await TokenManager.verifyPassword(password, user.password)))
            throw new Error('Invalid email or password');

        return { token: TokenManager.generateToken(user), user };
    }
}
