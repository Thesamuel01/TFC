import { UpdateMatchDTO } from '../DTOs';
import { MatchRepository } from '../repositories';

export type UpdateMessage = {
  message: string,
};

export default class UpdateMatch {
  constructor(
    private matchesRepository: MatchRepository,
  ) {}

  async execute(data: UpdateMatchDTO): Promise<UpdateMessage> {
    const isUpdateStatus = Object.prototype.hasOwnProperty.call(data, 'inProgress');
    let message: string;

    if (isUpdateStatus) {
      const { id, inProgress } = data;
      await this.matchesRepository.update({ id, inProgress });

      message = 'Finished';
    } else {
      const { id, homeTeamGoals, awayTeamGoals } = data;
      await this.matchesRepository.update({ id, homeTeamGoals, awayTeamGoals });

      message = 'Updated';
    }

    return { message };
  }
}
