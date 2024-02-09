import { Router, Router as createRouter } from "express";
import { UserController } from "../controllers/users.controller.js";

// Modo funcional

// export const userRouter = createRouter();
// const userController = new UserController();

// userRouter.get("/", userController.getAll);
// userRouter.get("/:id", userController.getById);
// userRouter.post("/", userController.create);
// userRouter.patch("/:id", userController.update);
// userRouter.delete("/:id", userController.delete);

// Modo orientado a objetos

export class UserRouter {
    router: Router;
    constructor(userController: UserController) {
        console.log("UserRouter created");
        this.router = createRouter();
        this.router.get("/", userController.getAll.bind(userController));
        this.router.get("/:id", userController.getById.bind(userController));
        this.router.post("/", userController.create.bind(userController));
        this.router.patch("/:id", userController.update.bind(userController));
        this.router.delete("/:id", userController.delete.bind(userController));
    }
}
