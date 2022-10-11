import { CreateMatchDTO, MatchDataDTO, UpdateMatchDTO } from '../../DTOs';
import { FindAllParams, MatchRepository } from '../match-repository';

export default class InMemoryMatchRepository implements MatchRepository {
  public matches: MatchDataDTO[] = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
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
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
  ];

  async findAll(params?: FindAllParams | undefined): Promise<MatchDataDTO[]> {
    if (params) {
      const { where: { inProgress } } = params;
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

  async create(data: CreateMatchDTO): Promise<MatchDataDTO> {
    const matchCreated = { id: this.matches.length + 1, ...data };

    this.matches.push(matchCreated);

    return matchCreated;
  }
}
