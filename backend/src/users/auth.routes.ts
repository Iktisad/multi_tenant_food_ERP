import express from "express";
import { AuthController } from "./auth.controller";

export default (authController: AuthController) => {
    const router = express.Router();

    // User Signup
    router.post("/register", (req, res) => authController.register(req, res));

    // User Login
    router.post("/login", (req, res) => authController.login(req, res));

    return router;
};
