import { FindAllParams } from '../../repositories/match-repository';
import MatchModel from '../../database/models/Match';
import Team from '../../database/models/Team';
import { MatchDataDTO, UpdateMatchDTO, CreateMatchDTO } from '../../DTOs';
import { MatchRepository } from '../../repositories';

export default class SequelizeMatchReposiroty implements MatchRepository {
  constructor(private model = MatchModel) {}

  async findAll(params?: FindAllParams): Promise<MatchDataDTO[]> {
    const data = await this.model.findAll({
      ...params,
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  }

  async findByPk(id: number): Promise<MatchDataDTO | null> {
    return this.model.findByPk(id);
  }

  async update({
    id,
    ...params
  }: UpdateMatchDTO): Promise<void> {
    await this.model.update(
      { ...params },
      { where: { id } },
    );
  }

  async create(data: CreateMatchDTO): Promise<MatchDataDTO> {
    return this.model.create(data);
  }
}
