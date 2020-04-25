export interface CrudRepository<T> {
    getAll(): Promise<T[]>;
    getByName(name: string): Promise<T>;
    save(newObj: T): Promise<T>;
    deleteByName(objName: string): Promise<boolean>
}