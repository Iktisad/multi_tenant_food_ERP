import Invitation, { IInvitation } from "./invite.model";
import User from "../users/user.model";
import Tenant from "../tenant/tenant.model";
import { v4 as uuidv4 } from "uuid";

export interface IInviteService {
    inviteUser(adminId: string, email: string): Promise<IInvitation>;
    acceptInvitation(token: string, name: string, password: string): Promise<string>;
}

export class InviteService implements IInviteService {
    async inviteUser(adminId: string, email: string): Promise<IInvitation> {
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== "Admin") {
            throw new Error("Only Admins can invite users.");
        }

        // Check if the invited email is already registered
        if (await User.findOne({ email })) {
            throw new Error("User already exists.");
        }

        // Ensure the business exists
        const tenant = await Tenant.findOne({ tenantId: admin.tenantId });
        if (!tenant) {
            throw new Error("Business does not exist.");
        }

        // Generate invitation
        const invitation = await new Invitation({
            email,
            tenantId: admin.tenantId,
            role: "Staff",
            token: uuidv4()
        }).save();

        // Send invitation email (Mocking for now)
        console.log(`📩 Invitation sent to ${email} with token: ${invitation.token}`);

        return invitation;
    }

    async acceptInvitation(token: string, name: string, password: string): Promise<string> {
        const invitation = await Invitation.findOne({ token });
        if (!invitation || invitation.expiresAt < new Date()) {
            throw new Error("Invalid or expired invitation.");
        }

        // Register the user under the business
        const newUser = new User({
            name,
            email: invitation.email,
            password,
            role: "Staff",
            tenantId: invitation.tenantId
        });
        await newUser.save();

        // Delete the invitation after acceptance
        await Invitation.deleteOne({ token });

        return `User ${name} registered successfully under Business ${invitation.tenantId}`;
    }
}
