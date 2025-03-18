import express from "express";
import { AuthMiddleware } from "../users/auth.middleware";
import { OrderController } from "./order.controller";

export default (orderController: OrderController) => {
    const router = express.Router();

    // ✅ Apply middleware correctly
    router.use(AuthMiddleware.authenticate);

    // ✅ Use controller methods
    router.post("/", async (req, res) => orderController.createOrder(req, res));
    router.get("/", async (req, res) => orderController.getOrders(req, res));

    return router;
};
