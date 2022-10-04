import { TeamRepository } from '../../repositories';
import TeamModel from '../../database/models/Team';
import Team from '../../entities/team';

export default class SequelizeTeamRpository implements TeamRepository {
  constructor(private model = TeamModel) {}

  async findAll(): Promise<Team[]> {
    const result = await this.model.findAll();

    return result;
  }

  async findById(id: number): Promise<Team | null> {
    const result = await this.model.findByPk(id);

    return result;
  }
}
