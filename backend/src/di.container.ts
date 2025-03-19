import { AuthService } from "./users/auth.service";
import { AuthController } from "./users/auth.controller";
import { OrderService } from "./orders/order.service";
import { OrderController } from "./orders/order.controller";
import { InviteService } from "./invitation/invite.service";
import { InviteController } from "./invitation/invite.controller";

class DIContainer {
    private static instance: DIContainer;
    private services: { [key: string]: any } = {};
    private controllers: { [key: string]: any } = {};

    private constructor() {
        this.initServices();
        this.initControllers();
    }

    // Initialize Services
    private initServices(): void {
        this.services.authService = new AuthService();
        this.services.orderService = new OrderService();
        this.services.inviteService = new InviteService();
    }

    // Initialize Controllers with injected services
    private initControllers(): void {
        this.controllers.authController = new AuthController(this.services.authService);
        this.controllers.orderController = new OrderController(this.services.orderService);
        this.controllers.inviteController = new InviteController(this.services.inviteService);
    }

    // Retrieve a service
    public getService<T>(serviceName: string): T {
        return this.services[serviceName] as T;
    }

    // Retrieve a controller
    public getController<T>(controllerName: string): T {
        return this.controllers[controllerName] as T;
    }

    // Singleton pattern: ensures a single instance
    public static getInstance(): DIContainer {
        if (!DIContainer.instance) {
            DIContainer.instance = new DIContainer();
        }
        return DIContainer.instance;
    }
}

// Export the singleton instance
export default DIContainer.getInstance();
