import User from '../entities/user';

export interface UserRepository {
  findByEmail(email: string): Promise<User>
}
