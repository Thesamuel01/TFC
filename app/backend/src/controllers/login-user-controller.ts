export interface LoginUserController<T, U, N> {
  handle(req: T, res: U, next?: N): Promise<U | void>
  validate(req: T, res: U, next?: N): U | void
}
