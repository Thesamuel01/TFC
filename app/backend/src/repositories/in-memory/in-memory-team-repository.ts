import { Team } from '../../entities';
import { TeamRepository } from '../team-repository';

export default class InMemoryTeamRepository implements TeamRepository {
  public users: Team[] = [
    {
      id: 1,
      teamName: 'Corinthias',
    },
    {
      id: 2,
      teamName: 'Vasco',
    },
  ];

  async findAll(): Promise<Team[]> {
    return this.users;
  }

  async findById(id: number): Promise<Team | null> {
    const team = this.users.find(({ id: teamId }) => teamId === id);

    return team || null;
  }
}
