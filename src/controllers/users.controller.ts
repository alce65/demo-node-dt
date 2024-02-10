import { Request, Response, NextFunction } from "express";
import { HttpError } from "../http.error.js";
import { Repository } from "../repository/repo.js";
import { User } from "../entities/user.js";

export class UserController {
    constructor(private repo: Repository<User>) {
        console.log("UserController created");
    }

    async getAll(req: Request, res: Response) {
        const users = await this.repo.findAll();
        res.json(users);
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id);
        try {
            const data = await this.repo.findById(id);
            res.json(data);
        } catch (error) {
            const message = (error as Error).message;
            next(new HttpError(404, message));
        }
    }

    async create(req: Request, res: Response) {
        const newUser = await this.repo.insert(req.body);
        res.status(201);
        res.json(newUser);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const index = Number(req.params.id);
            const updatedUser = await this.repo.update(index, req.body);
            res.json(updatedUser);
        } catch (error) {
            const message = (error as Error).message;
            next(new HttpError(404, message));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const index = Number(req.params.id);
            await this.repo.delete(index);
            res.status(204);
            res.json();
        } catch (error) {
            const message = (error as Error).message;
            next(new HttpError(404, message));
        }
    }
}
