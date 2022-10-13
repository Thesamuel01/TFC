import { Match } from '../entities';
import { CreateMatchDTO, MatchDataDTO } from '../DTOs';
import { MatchRepository, TeamRepository } from '../repositories';
import { EqualTeamsIDsError, NotFoundError } from './errors';

export default class CreateMatch {
  constructor(
    private matchRepository: MatchRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute(data: CreateMatchDTO): Promise<MatchDataDTO> {
    if (data.homeTeam === data.awayTeam) throw new EqualTeamsIDsError();

    const repo = this.teamRepository;

    return Promise
      .all([repo.findById(data.homeTeam), repo.findById(data.awayTeam)])
      .then(([homeTeam, awayTeam]) => {
        if (!homeTeam || !awayTeam) throw new NotFoundError();

        return this.matchRepository.insert(Match.create({
          homeTeamId: homeTeam.id,
          homeTeamName: homeTeam.teamName,
          homeTeamGoals: data.homeTeamGoals,
          awayTeamId: awayTeam.id,
          awayTeamName: awayTeam.teamName,
          awayTeamGoals: data.awayTeamGoals,
          inProgress: data.inProgress,
        }));
      });
  }
}
