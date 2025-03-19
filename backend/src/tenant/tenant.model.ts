import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface ITenant extends Document {
    tenantId: string;
    name: string;
}

const TenantSchema: Schema = new Schema({
    tenantId: { type: String, unique: true, default: uuidv4 }, // Auto-generate Tenant ID
    name: { type: String, unique: true, required: true }, // Unique business name
    
}, {timestamps:true});

export default mongoose.model<ITenant>("Tenant", TenantSchema);
