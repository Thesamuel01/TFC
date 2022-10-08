import { CreateMatchDTO, MatchDataDTO } from '../DTOs';
import { UpdateMatchData } from '../entities/match';

export interface FindAllParams {
  where: {
    inProgress: boolean,
  },
}

export interface MatchRepository {
  findAll(params?: FindAllParams): Promise<MatchDataDTO[]>
  findByPk(id: number): Promise<MatchDataDTO | null>
  update(values: UpdateMatchData): Promise<void>
  create(data: CreateMatchDTO): Promise<MatchDataDTO>
}
