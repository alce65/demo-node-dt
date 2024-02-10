export interface Repository<T extends { id: unknown }> {
    findAll(): Promise<T[]>;
    findById(id: T["id"]): Promise<T>;
    search?({ key, value }: { key: string; value: unknown }): Promise<T[]>;
    insert(data: T): Promise<T>;
    update(id: T["id"], data: T): Promise<T>;
    delete(id: T["id"]): Promise<void>;
}
