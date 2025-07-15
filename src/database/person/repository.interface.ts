export interface IRepository<T> {
  readAll(page:number,items_per_page:number): Promise<T[]>;
  create(entity: T): Promise<T>;
}
