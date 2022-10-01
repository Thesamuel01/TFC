import { UserDataDTO } from '../DTOs';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDataDTO | null>
}
