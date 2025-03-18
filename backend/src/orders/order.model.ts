import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    customerName: string;
    items: { name: string; quantity: number }[];
    totalPrice: number;
    status: string;
}

const OrderSchema: Schema = new Schema({
    customerName: { type: String, required: true },
    items: [{ name: String, quantity: Number }],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
});

export const getOrderModel = (tenantId: string) => mongoose.model<IOrder>(`Order_${tenantId}`, OrderSchema);
