import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { HttpError } from "./http.error.js";

export const app = express();

type User = { id: number; name: string };
const USERS: User[] = [
    {
        id: 1,
        name: "Pepe",
    },
    { id: 2, name: "Juan" },
    { id: 3, name: "Elena" },
];

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("Saludo desde el middleware");
    const auth = req.get("Authorization");
    if (!auth) {
        //next(new HttpError(404, "Autorización requerida"));
        next();
    }
    next();
});

// API routes -> Method (GET, POST, PATCH, PUT, DELETE) + URL

app.get("/", (req: Request, res: Response) => {
    res.status(202);
    res.json(["Hello World!"]);
});

// Rutas de la API: /users

app.get("/users", (req: Request, res: Response) => {
    res.json(USERS);
});

app.get("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params);
    const index = Number(req.params.id);
    const data = USERS.find((user) => user.id === index);
    if (!data) {
        next(new HttpError(404, "User not found"));
    }
    console.log("Final de la función");
    res.json(data);
});

app.post("/users", (req: Request, res: Response) => {
    console.log(req.body);
    const newUser: User = {
        ...req.body,
        id: USERS.length + 1,
    };
    USERS.push(newUser);
    console.log(USERS);
    res.json(newUser);
});

app.patch("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    const index = Number(req.params.id);
    const dataIndex = USERS.findIndex((user) => user.id === index);
    if (dataIndex === -1) {
        next(new HttpError(404, "User not found"));
    }
    USERS[dataIndex] = {
        ...USERS[dataIndex],
        ...req.body,
    };
    console.log(USERS);
    res.json(USERS[dataIndex]);
});

app.delete("/users/:id", (req: Request, res: Response, next: NextFunction) => {
    const index = Number(req.params.id);
    const dataIndex = USERS.findIndex((user) => user.id === index);
    if (dataIndex === -1) {
        next(new HttpError(404, "User not found"));
    }
    const deletedUser = USERS.splice(dataIndex, 1);
    console.log(USERS);
    res.json(deletedUser);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
        res.status(err.statusCode);
        res.json({ error: err.message });
        return;
    }
    res.status(500);
    res.json({ error: err.message });
});
