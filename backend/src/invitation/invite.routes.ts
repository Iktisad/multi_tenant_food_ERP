import express from "express";
import { AuthMiddleware } from "../users/auth.middleware";
import { InviteController } from "./invite.controller";

export default (inviteController: InviteController) => {
    const router = express.Router();

    router.post("/invite", AuthMiddleware.authenticate, (req, res, next) => inviteController.inviteUser(req, res, next));
    router.post("/accept-invite", (req, res, next) => inviteController.acceptInvitation(req, res, next));

    return router;
};
