import { UserDataDTO } from '../../DTOs/user-data-dto';
import { UserRepository } from '../user-repository';

export default class InMemoryUserRepository implements UserRepository {
  public users: UserDataDTO[] = [
    {
      id: 1,
      email: 'test@test.com',
      username: 'test123',
      role: 'user',
      password: 'secret_password',
    },
  ];

  async findByEmail(email: string): Promise<UserDataDTO | null> {
    const user = this.users.find(({ email: userEmail }) => userEmail === email);

    return user || null;
  }
}
