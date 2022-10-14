import { Match } from '../entities';
import { MatchDataDTO, UpdateMatchDTO } from '../DTOs';

export interface FindAllParams {
  inProgress?: boolean,
}

export interface MatchRepository {
  findAll(params?: FindAllParams): Promise<MatchDataDTO[]>
  update(values: UpdateMatchDTO): Promise<void>
  insert(data: Match): Promise<MatchDataDTO>
}
