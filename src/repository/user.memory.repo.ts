import { User } from "../entities/user";
import { Repository } from "./repo";

const USERS: User[] = [
    { id: 1, name: "Pepe" },
    { id: 2, name: "Juan" },
    { id: 3, name: "Elena" },
];

export class UserMemoryRepository implements Repository<User> {
    constructor() {
        console.log("UserMemoryRepository created");
    }

    async findAll(): Promise<User[]> {
        return USERS;
    }

    async findById(id: User["id"]): Promise<User> {
        const user = USERS.find((user) => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async insert(data: User): Promise<User> {
        const newUser = {
            ...data,
            id: USERS.length + 1,
        };
        USERS.push(newUser);
        return newUser;
    }

    async update(id: User["id"], data: User): Promise<User> {
        const dataIndex = USERS.findIndex((user) => user.id === id);
        if (dataIndex === -1) {
            throw new Error("User not found");
        }
        USERS[dataIndex] = {
            ...USERS[dataIndex],
            ...data,
        };
        return USERS[dataIndex];
    }

    async delete(id: User["id"]): Promise<void> {
        const dataIndex = USERS.findIndex((user) => user.id === id);
        if (dataIndex === -1) {
            throw new Error("User not found");
        }
        USERS.splice(dataIndex, 1);
    }
}
