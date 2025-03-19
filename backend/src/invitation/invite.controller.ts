import { Response, NextFunction } from "express";
import { IInviteService } from "./invite.service";
import { AuthRequest } from "../users/auth.middleware";

export class InviteController {
    private inviteService: IInviteService;

    constructor(inviteService: IInviteService) {
        this.inviteService = inviteService;
    }

    async inviteUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) {
                res.status(403).json({ error: "Unauthorized" });
                return;
            }

            const invitation = await this.inviteService.inviteUser(req.user.id, req.body.email);
            res.status(201).json({ message: "Invitation sent", invitation });
        } catch (error: any) {
            return next(error); 
        }
    }

    async acceptInvitation(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { token, name, password } = req.body;
            const message = await this.inviteService.acceptInvitation(token, name, password);
            res.status(201).json({ message });
        } catch (error: any) {
            next(error);
        }
    }
}
