import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'Admin' | 'Manager' | 'Staff' | 'Delivery';
    tenantId: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Staff', 'Delivery'], required: true },
    tenantId: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);
