import { Response } from "express";
import { IOrderService } from "./order.service";
import { AuthRequest } from "../users/auth.middleware";

export class OrderController {
    private orderService: IOrderService;

    constructor(orderService: IOrderService) {
        this.orderService = orderService;
    }

    async createOrder(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(403).json({ error: "Unauthorized access" });
                return;
            }
            const order = await this.orderService.createOrder(req.user.tenantId, req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getOrders(req: AuthRequest, res: Response): Promise<void> {
        try {
            if (!req.user) {
                res.status(403).json({ error: "Unauthorized access" });
                return;
            }
            const orders = await this.orderService.getOrders(req.user.tenantId);
            res.json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
