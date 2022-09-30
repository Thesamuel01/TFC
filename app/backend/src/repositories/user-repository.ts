import { UserDataDTO } from '../DTOs/user-data-dto';

export interface UserRepository {
  findByEmail(email: string): Promise<UserDataDTO | null>
}
