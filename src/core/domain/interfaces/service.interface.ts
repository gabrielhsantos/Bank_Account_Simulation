export interface ICreateService<P, R> {
  create(params: P, accountId?: number): R;
}

export interface IFindAllService<P, R> {
  findAll(params?: P): R;
}

export interface IFindOneService<P, R> {
  findOne(params?: P): R;
}

export interface IUpdateService<P, R> {
  delete(params: P): R;
}
