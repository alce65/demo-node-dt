import { readFile, writeFile } from "fs/promises";
import { User } from "../entities/user";
import { Repository } from "./repo";

export class UserFileRepository implements Repository<User> {
    file = "./dist/users.json";

    constructor() {
        console.log("UserFileRepository created");
    }

    async findAll(): Promise<User[]> {
        const data = await readFile(this.file, "utf-8");
        return JSON.parse(data);
    }

    async findById(id: number): Promise<User> {
        const usersData = await this.findAll();
        const user = usersData.find((user) => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    search?({ key, value }: { key: string; value: unknown }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async insert(data: User): Promise<User> {
        const usersData = await this.findAll();
        const newUser = {
            ...data,
            id: usersData.length + 1,
        };
        usersData.push(newUser);
        await writeFile(this.file, JSON.stringify(usersData, null, 2), "utf-8");
        return newUser;
    }
    async update(id: number, data: User): Promise<User> {
        const usersData = await this.findAll();
        const dataIndex = usersData.findIndex((user) => user.id === id);
        if (dataIndex === -1) {
            throw new Error("User not found");
        }
        usersData[dataIndex] = {
            ...usersData[dataIndex],
            ...data,
        };
        await writeFile(this.file, JSON.stringify(usersData, null, 2), "utf-8");
        return usersData[dataIndex];
    }
    async delete(id: number): Promise<void> {
        const usersData = await this.findAll();
        const dataIndex = usersData.findIndex((user) => user.id === id);
        if (dataIndex === -1) {
            throw new Error("User not found");
        }
        usersData.splice(dataIndex, 1);
        await writeFile(this.file, JSON.stringify(usersData), "utf-8");
    }
}
