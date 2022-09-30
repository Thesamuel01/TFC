export interface PasswordHashing {
  check(password: string, hash: string): boolean
}
