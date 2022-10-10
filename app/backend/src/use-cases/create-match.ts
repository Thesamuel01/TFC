import { CreateMatchDTO, MatchDataDTO } from '../DTOs';
import { MatchRepository, TeamRepository } from '../repositories';
import { EqualTeamsIDsError, NotFoundError } from './errors';

export default class CreateMatch {
  constructor(
    private matchRepository: MatchRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute(data: CreateMatchDTO): Promise<MatchDataDTO> {
    if (data.homeTeam === data.awayTeam) {
      throw new EqualTeamsIDsError();
    }

    return Promise.all([
      this.teamRepository.findById(data.homeTeam),
      this.teamRepository.findById(data.awayTeam),
    ]).then((value) => {
      const findMatches = value.every((match) => match);

      if (!findMatches) {
        throw new NotFoundError();
      }

      return this.matchRepository.create(data);
    });
  }
}
