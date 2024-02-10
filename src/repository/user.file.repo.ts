import { readFile, writeFile } from "fs/promises";
import { User } from "../entities/user";
import { Repository } from "./repo";

const asyncDataAccess = (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`[
            { "id": 1, "name": "Pepe" },
            { "id": 2, "name": "Juan" },
            { "id": 3, "name": "Elena " }]`);
        }, 0);
    });
};

export class UserFileRepository implements Repository<User> {
    file = "./dist/users.json";

    constructor() {
        console.log("UserFileRepository created");
    }

    async findAll(): Promise<User[]> {
        console.log("Starting UserFileRepository findAll");
        // const data = await readFile(this.file, "utf-8");
        const data = await asyncDataAccess();
        // el await provoca un GET /users y
        // antes del console.log("Starting UserFileRepository findAll");
        console.log("Repo Data", data);
        return JSON.parse(data);
    }

    findById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    search?({ key, value }: { key: string; value: unknown }): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    insert(data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // async findById(id: number): Promise<User> {
    //     const usersData = await this.findAll();
    //     const user = usersData.find((user) => user.id === id);
    //     if (!user) {
    //         throw new Error("User not found");
    //     }
    //     return user;
    // }

    // search?({ key, value }: { key: string; value: unknown }): Promise<User[]> {
    //     throw new Error("Method not implemented.");
    // }
    // async insert(data: User): Promise<User> {
    //     const usersData = await this.findAll();
    //     const newUser = {
    //         ...data,
    //         id: usersData.length + 1,
    //     };
    //     usersData.push(newUser);
    //     await fs.writeFile(
    //         this.file,
    //         JSON.stringify(usersData, null, 2),
    //         "utf-8"
    //     );
    //     return newUser;
    // }
    // async update(id: number, data: User): Promise<User> {
    //     const usersData = await this.findAll();
    //     const dataIndex = usersData.findIndex((user) => user.id === id);
    //     if (dataIndex === -1) {
    //         throw new Error("User not found");
    //     }
    //     usersData[dataIndex] = {
    //         ...usersData[dataIndex],
    //         ...data,
    //     };
    //     await fs.writeFile(
    //         this.file,
    //         JSON.stringify(usersData, null, 2),
    //         "utf-8"
    //     );
    //     return usersData[dataIndex];
    // }
    // async delete(id: number): Promise<void> {
    //     const usersData = await this.findAll();
    //     const dataIndex = usersData.findIndex((user) => user.id === id);
    //     if (dataIndex === -1) {
    //         throw new Error("User not found");
    //     }
    //     usersData.splice(dataIndex, 1);
    //     await fs.writeFile(this.file, JSON.stringify(usersData), "utf-8");
    // }
}
