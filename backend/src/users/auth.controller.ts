import { Request, Response } from 'express';
import { IAuthService } from './auth.service';

export class AuthController {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async register(req: Request, res: Response) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.authService.login(req.body.email, req.body.password);
            res.json(result);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }
}
