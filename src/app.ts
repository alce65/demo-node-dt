import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { HttpError } from "./http.error.js";
import { UserRouter } from "./router/user.router.js";
import { UserController } from "./controllers/users.controller.js";
// import { UserMemoryRepository } from "./repository/user.memory.repo.js";
import { UserFileRepository } from "./repository/user.file.repo.js";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Saludo desde el middleware");
    const auth = req.get("Authorization");
    // if (!auth) {
    //  next(new HttpError(404, "Autorización requerida"));
    // }
    next();
});

app.use(express.static("public"));

// API routes -> Method (GET, POST, PATCH, PUT, DELETE) + URL

app.get("/", (req: Request, res: Response) => {
    res.status(202);
    res.json(["Hello World!"]);
});

// Rutas de la API: /users

// const userRepo = new UserMemoryRepository();
const userRepo = new UserFileRepository();
const userController = new UserController(userRepo);
const userRouter = new UserRouter(userController);

app.use("/users", userRouter.router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log("Error middleware", err);
    if (err instanceof HttpError) {
        res.status(err.statusCode);
        res.json({ error: err.message });
        return;
    }
    res.status(500);
    res.json({ error: err.message });
});
