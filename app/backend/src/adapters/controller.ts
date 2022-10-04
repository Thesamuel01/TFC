export interface Controller<T, U, N> {
  handle(req: T, res: U, next?: N): Promise<U | void>
}
