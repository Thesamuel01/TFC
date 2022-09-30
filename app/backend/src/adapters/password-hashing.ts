export interface PasswordHashing {
  compare(password: string, hash: string): boolean
}
