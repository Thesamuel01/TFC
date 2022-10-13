import { Match } from '../entities';
import { MatchDataDTO, UpdateMatchDTO } from '../DTOs';

export interface FindAllParams {
  inProgress?: boolean,
}

export interface MatchRepository {
  findAll(params?: FindAllParams): Promise<MatchDataDTO[]>
  findByPk(id: number): Promise<MatchDataDTO | null>
  update(values: UpdateMatchDTO): Promise<void>
  insert(data: Match): Promise<MatchDataDTO>
}
