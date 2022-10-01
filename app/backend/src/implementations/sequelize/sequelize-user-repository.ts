import UserModel from '../../database/models/User';
import { UserRepository } from '../../repositories/user-repository';
import { UserDataDTO } from '../../DTOs';

export default class SequelizeUserReposiroty implements UserRepository {
  constructor(private model = UserModel) {}

  async findByEmail(email: string): Promise<UserDataDTO | null> {
    const user = await this.model.findOne({ where: { email } });

    return user || null;
  }
}
