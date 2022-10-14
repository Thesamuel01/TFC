import sortByPriority from '../utils/sort-number-by-priority';
import { LeaderBoard } from '../entities';
import { MatchRepository, TeamRepository } from '../repositories';
import { LeaderBoardData } from '../entities/leaderboard';

export default class GetLeaderBoard {
  constructor(
    private matchesRepository: MatchRepository,
    private teamRepository: TeamRepository,
  ) {}

  async execute(category?: string): Promise<LeaderBoardData[]> {
    const teams = await this.teamRepository.findAll();
    const finishedMatches = await this.matchesRepository.findAll({ inProgress: false });

    const result = teams.map((team) => {
      const matches = category ? finishedMatches.filter((data) => {
        if (category === 'away') return data.awayTeam === team.id;

        return data.homeTeam === team.id;
      }) : finishedMatches;

      const name = team.teamName;
      const gamesResult = LeaderBoard.calcGamesResult(team, matches);
      const goalsAmount = LeaderBoard.calcGoalsAmount(team, matches);

      return LeaderBoard.create({ name, ...gamesResult, ...goalsAmount });
    });

    return result
      .sort(({ priority: A }, { priority: B }) => sortByPriority(B, A))
      .map((data) => data.format());
  }
}
