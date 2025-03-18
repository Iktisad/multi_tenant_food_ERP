import { getOrderModel, IOrder } from "./order.model";

// Define an interface for OrderService methods
export interface IOrderService {
    createOrder(tenantId: string, data: Partial<IOrder>): Promise<IOrder>;
    getOrders(tenantId: string): Promise<IOrder[]>;
}

export class OrderService implements IOrderService {
    async createOrder(tenantId: string, data: Partial<IOrder>): Promise<IOrder> {
        const Order = getOrderModel(tenantId); // Retrieve the dynamic model based on the tenant
        return await new Order(data).save();
    }

    async getOrders(tenantId: string): Promise<IOrder[]> {
        const Order = getOrderModel(tenantId);
        return await Order.find();
    }
}
