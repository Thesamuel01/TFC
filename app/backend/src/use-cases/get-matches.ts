import { MatchDataDTO } from '../DTOs';
import { MatchRepository } from '../repositories';

type QueryString = {
  inProgress: boolean
};

export default class GetMatches {
  constructor(
    private matchesRepository: MatchRepository,
  ) {}

  async execute(data?: QueryString): Promise<MatchDataDTO[]> {
    if (data) {
      const params = { ...data };

      return this.matchesRepository.findAll(params);
    }

    return this.matchesRepository.findAll();
  }
}
