import { Team } from '../entities';
import { TeamRepository } from '../repositories';
import { NotFoundError } from './errors';

export default class GetTeams {
  constructor(
    private teamRepository: TeamRepository,
  ) {}

  async execute(id?: number): Promise<Team[] | Team> {
    if (id) {
      const result = await this.teamRepository.findById(id);

      if (!result) {
        throw new NotFoundError();
      }

      return result;
    }

    return this.teamRepository.findAll();
  }
}
