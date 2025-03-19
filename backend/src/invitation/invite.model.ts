import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IInvitation extends Document {
    email: string;
    tenantId: string;
    role: "Staff"; // Only staff members can be invited
    token: string;
    expiresAt: Date;
}

const InvitationSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    tenantId: { type: String, required: true },
    role: { type: String, enum: ["Staff"], required: true },
    token: { type: String, unique: true, default: uuidv4 },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } // Expires in 7 days
});

export default mongoose.model<IInvitation>("Invitation", InvitationSchema);
