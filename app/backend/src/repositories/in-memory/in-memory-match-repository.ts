import { Match } from '../../entities';
import { MatchDataDTO, UpdateMatchDTO } from '../../DTOs';
import { FindAllParams, MatchRepository } from '../match-repository';

export default class InMemoryMatchRepository implements MatchRepository {
  public matches: MatchDataDTO[] = [
    {
      id: 1,
      homeTeam: 3,
      homeTeamGoals: 1,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Grêmio',
      },
    },
    {
      id: 2,
      homeTeam: 1,
      homeTeamGoals: 2,
      awayTeam: 5,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: 'Corinthians',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
    {
      id: 1,
      homeTeam: 2,
      homeTeamGoals: 3,
      awayTeam: 4,
      awayTeamGoals: 2,
      inProgress: true,
      teamHome: {
        teamName: 'Vasco',
      },
      teamAway: {
        teamName: 'Grêmio',
      },
    },
  ];

  async findAll(params?: FindAllParams | undefined): Promise<MatchDataDTO[]> {
    if (params) {
      const { inProgress } = params;
      const result = this.matches.filter((data) => data.inProgress === inProgress);

      return result;
    }

    return this.matches;
  }

  async findByPk(id: number): Promise<MatchDataDTO | null> {
    const result = this.matches.find((data) => data.id === id);
    return result || null;
  }

  async update(values: UpdateMatchDTO): Promise<void> {
    const { id, ...params } = values;

    this.matches = this.matches.map((data, index) => {
      if (data.id === id) {
        return {
          ...this.matches[index],
          ...params,
        };
      }

      return data;
    });
  }

  async insert(data: Match): Promise<MatchDataDTO> {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = data;
    const id = this.matches.length + 1;
    const matchCreated = {
      id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    };

    this.matches.push(matchCreated);

    return matchCreated;
  }
}
