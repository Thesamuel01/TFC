import { User } from '../entities';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
}
