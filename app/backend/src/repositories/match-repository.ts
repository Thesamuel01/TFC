import { CreateMatchDTO, MatchDataDTO, UpdateMatchDTO } from '../DTOs';

export interface FindAllParams {
  where: {
    inProgress: boolean,
  },
}

export interface MatchRepository {
  findAll(params?: FindAllParams): Promise<MatchDataDTO[]>
  findByPk(id: number): Promise<MatchDataDTO | null>
  update(values: UpdateMatchDTO): Promise<void>
  create(data: CreateMatchDTO): Promise<MatchDataDTO>
}
